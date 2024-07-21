import fs from "fs-extra";
import path from "path";
import archiver from "archiver";
import { NextRequest, NextResponse } from "next/server";
import { NextApiRequest, NextApiResponse } from "next";

export async function POST(req: NextApiRequest, res: NextApiResponse) {
  try {
    //@ts-ignore
    const formdata = await req.formData();
    const templateID = formdata.get("template_id");
    const type = formdata.get("type");
    const html = formdata.get("content");

    if (!templateID || !type || !html) {
      return NextResponse.json({ message: "Missing template_id, type or content" }, { status: 400 });
    }

    const dir = path.join(process.cwd(), "public", "builderjs", "templates", type as string, templateID as string);
    const filePath = path.join(dir, "index.html");

    if (!fs.existsSync(filePath)) {
      return NextResponse.json({ message: `File not found: ${filePath}` }, { status: 400 });
    }

    // Save the posted HTML content to the corresponding template's index.html file
    await fs.outputFile(filePath, html as string);

    // Create tmp folder if it doesn't exist
    const tmpDir = path.join(process.cwd(), "tmp");
    await fs.ensureDir(tmpDir);

    // Initialize archive object
    const zipFile = path.join(tmpDir, `${templateID}.zip`);
    const output = fs.createWriteStream(zipFile);
    const archive = archiver("zip", { zlib: { level: 9 } });

    res.setHeader("Content-Description", "File Transfer");
    res.setHeader("Content-Type", "application/zip");
    res.setHeader("Content-Disposition", `attachment; filename=${path.basename(zipFile)}`);
    res.setHeader("Content-Transfer-Encoding", "binary");
    res.setHeader("Expires", "0");
    res.setHeader("Cache-Control", "must-revalidate");
    res.setHeader("Pragma", "public");
    res.setHeader("Content-Length", archive.pointer().toString());

    const fileStream = fs.createReadStream(zipFile);
    fileStream.pipe(res);

    archive.on("error", (err) => {
      throw err;
    });

    archive.pipe(output);
    archive.directory(dir, false);
    await archive.finalize();
  } catch (error: any) {
    return NextResponse.json({ status: 500, message: `Internal Server Error: ${error.message}` });
  }
}
