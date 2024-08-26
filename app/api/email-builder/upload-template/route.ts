import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { IncomingForm } from "formidable";
import { promisify } from "util";
import JSZip from "jszip";

const form = new IncomingForm();

export async function POST(request: NextRequest) {
  try {
    // Parse the form data
    const { fields, files } = await promisify(form.parse.bind(form))(request as any);

    //@ts-ignore
    const file = files.file[0];
    
    if (!file) {
      return NextResponse.json({ message: "No file uploaded" }, { status: 400 });
    }

    // Generate an ID for the template
    const id = Date.now().toString(); // Replace with unique ID generation if needed
    const tmpzip = path.join(process.cwd(), "tmp", "uploaded.zip");
    const name = path.join(process.cwd(), "public", "templates", "custom", id);

    // Save the uploaded file
    fs.renameSync(file.filepath, tmpzip);

    // Extract ZIP file
    const zip = new JSZip();
    const zipContent = fs.readFileSync(tmpzip);
    const zipData = await zip.loadAsync(zipContent);

    fs.mkdirSync(name, { recursive: true });

    await Promise.all(
      Object.keys(zipData.files).map(async (fileName) => {
        const file = zipData.files[fileName];
        if (!file.dir) {
          const filePath = path.join(name, fileName);
          const fileContent = await file.async("nodebuffer");
          fs.writeFileSync(filePath, fileContent);
        }
      })
    );

    if (!fs.existsSync(path.join(name, "index.html"))) {
      return NextResponse.json({ message: "Cannot find an 'index.html' file in the root folder of your ZIP package" }, { status: 400 });
    }

    // Return a success response or redirect URL
    return NextResponse.json({ message: "File uploaded and extracted successfully", redirect: `/design?id=${id}&type=custom` });
  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
