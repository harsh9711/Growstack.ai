import { NextApiRequest, NextApiResponse } from "next";
import fs from "fs-extra";
import path from "path";
import archiver from "archiver";
import { NextResponse } from "next/server";

export async function POST(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { template_id: templateID, type, content: html } = req.body;

    if (!templateID || !type || !html) {
      return NextResponse.json({ message: "Missing template_id, type or content" });
    }

    const dir = path.join(process.cwd(), "templates", type, templateID);
    const filePath = path.join(dir, "index.html");

    if (!fs.existsSync(filePath)) {
      return NextResponse.json({ message: `File not found: ${filePath}` });
    }

    // Save the posted HTML content to the corresponding template's index.html file
    await fs.outputFile(filePath, html);

    // Create tmp folder if it doesn't exist
    const tmpDir = path.join(process.cwd(), "tmp");
    await fs.ensureDir(tmpDir);

    // Initialize archive object
    const zipFile = path.join(tmpDir, `${templateID}.zip`);
    const output = fs.createWriteStream(zipFile);
    const archive = archiver("zip", { zlib: { level: 9 } });

    output.on("close", () => {
      res.setHeader("Content-Description", "File Transfer");
      res.setHeader("Content-Type", "application/octet-stream");
      res.setHeader("Content-Disposition", `attachment; filename=${path.basename(zipFile)}`);
      res.setHeader("Content-Transfer-Encoding", "binary");
      res.setHeader("Expires", "0");
      res.setHeader("Cache-Control", "must-revalidate");
      res.setHeader("Pragma", "public");
      res.setHeader("Content-Length", archive.pointer().toString());

      const fileStream = fs.createReadStream(zipFile);
      fileStream.pipe(res);
    });

    archive.on("error", (err) => {
      throw err;
    });

    archive.pipe(output);
    archive.directory(dir, false);
    await archive.finalize();
  } catch (error : any) {
    
    res.status(500).json({ message: `Internal Server Error: ${error.message}` });
  }
};