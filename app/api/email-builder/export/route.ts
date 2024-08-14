import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import JSZip from "jszip";
import { parse } from "qs";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.text();
    const parsedData = parse(formData);

    const { template_id, type, content, ...extraData } = parsedData;

    if (!template_id || !type || !content) {
      return NextResponse.json({ message: "Missing required parameters" }, { status: 400 });
    }

    const dir = path.join(process.cwd(), "public/builderjs/templates", type as string, template_id as string);
    const filePath = path.join(dir, "index.html");

    if (!fs.existsSync(filePath)) {
      return NextResponse.json({ message: `File not found: ${filePath}` }, { status: 404 });
    }

    fs.writeFileSync(filePath, content as string);

    const tmpDir = path.join(process.cwd(), "tmp");
    if (!fs.existsSync(tmpDir)) {
      fs.mkdirSync(tmpDir, { recursive: true });
    }

    const zipFileName = `${template_id}.zip`;
    const zipFilePath = path.join(tmpDir, zipFileName);
    const zip = new JSZip();

    const addFolderToZip = (folderPath: string, zipFolder: JSZip) => {
      const items = fs.readdirSync(folderPath, { withFileTypes: true });

      for (const item of items) {
        const fullPath = path.join(folderPath, item.name);

        if (item.isDirectory()) {
          const folder = zipFolder.folder(item.name);
          addFolderToZip(fullPath, folder!);
        } else {
          const fileContent = fs.readFileSync(fullPath);
          zipFolder.file(item.name, fileContent);
        }
      }
    };

    addFolderToZip(dir, zip);

    if (Object.keys(extraData).length > 0) {
      zip.file("extraData.json", JSON.stringify(extraData));
    }

    const zipContent = await zip.generateAsync({ type: "nodebuffer" });
    fs.writeFileSync(zipFilePath, zipContent);

    // Prepare the download response
    const headers = {
      "Content-Description": "File Transfer",
      "Content-Type": "application/octet-stream",
      "Content-Disposition": `attachment; filename=${zipFileName}`,
      "Content-Transfer-Encoding": "binary",
      Expires: "0",
      "Cache-Control": "must-revalidate",
      Pragma: "public",
      "Content-Length": zipContent.length.toString(),
    };

    return new NextResponse(zipContent, { headers });
  } catch (error: any) {
    console.error("Error processing request:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
