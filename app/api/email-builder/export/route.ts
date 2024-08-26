import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import JSZip from "jszip";
import { parse } from "qs";
import { Readable } from "stream";

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

    // Generate zip content in memory
    const zipContent = await zip.generateAsync({ type: "nodebuffer" });

    // Create a readable stream from the zip content
    const zipStream = new Readable();
    zipStream.push(zipContent);
    zipStream.push(null); // End of stream

    // Prepare the response
    const headers = {
      "Content-Description": "File Transfer",
      "Content-Type": "application/zip",
      "Content-Disposition": `attachment; filename=${template_id}.zip`,
      "Content-Transfer-Encoding": "binary",
      Expires: "0",
      "Cache-Control": "must-revalidate",
      Pragma: "public",
      "Content-Length": zipContent.length.toString(),
    };

    return new NextResponse(zipStream as any, { headers });
  } catch (error: any) {
    console.error("Error processing request:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
