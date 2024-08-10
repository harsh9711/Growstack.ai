import { NextResponse } from "next/server";
import path from "path";
import fs from "fs";
import { readdirSync, createReadStream } from "fs";
import archiver from "archiver";
import formidable from "formidable";

// Helper function to parse the incoming FormData
async function parseFormData(req: Request) {
  const form = formidable({ multiples: false });

  return new Promise<{ fields: any }>((resolve, reject) => {
    form.parse(req as any, (err, fields) => {
      if (err) {
        reject(err);
      } else {
        resolve({ fields });
      }
    });
  });
}

// This will be the handler for POST requests to the API route
export async function POST(req: Request) {
  try {
    // Parse the form data
    const { fields } = await parseFormData(req);

    const template_id = fields.template_id;
    const type = fields.type;
    const content = fields.content;

    console.log(fields);
    if (!template_id || !type || !content) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
    }

    // Get the directory path of the specified template
    const dir = path.join(process.cwd(), "templates", type, template_id);
    const filePath = path.join(dir, "index.html");

    // Check if the file exists
    if (!fs.existsSync(filePath)) {
      return NextResponse.json({ message: `File not found: ${filePath}` }, { status: 404 });
    }

    // Save the HTML content to the corresponding template's index.html file
    fs.writeFileSync(filePath, content);

    // Create tmp directory if it doesn't exist
    const tmpDir = path.join(process.cwd(), "tmp");
    if (!fs.existsSync(tmpDir)) {
      fs.mkdirSync(tmpDir, { recursive: true });
    }

    // Initialize archive object
    const zipFile = path.join(tmpDir, `${template_id}.zip`);
    const output = fs.createWriteStream(zipFile);
    const archive = archiver("zip", { zlib: { level: 9 } });

    output.on("close", function () {
      console.log(archive.pointer() + " total bytes");
      console.log("Archiver has been finalized and the output file descriptor has closed.");
    });

    archive.on("error", function (err) {
      throw err;
    });

    // Pipe the archive data to the file
    archive.pipe(output);

    // Append files to the archive
    const files = readdirSync(dir);
    files.forEach((file) => {
      const fullPath = path.join(dir, file);
      if (fs.lstatSync(fullPath).isFile()) {
        archive.file(fullPath, { name: file });
      }
    });

    // Finalize the archive
    await archive.finalize();

    // Prepare the response for downloading
    const stats = fs.statSync(zipFile);
    const fileStream = createReadStream(zipFile);

    return NextResponse.json(fileStream, {
      headers: {
        "Content-Description": "File Transfer",
        "Content-Type": "application/octet-stream",
        "Content-Disposition": `attachment; filename=${path.basename(zipFile)}`,
        "Content-Transfer-Encoding": "binary",
        Expires: "0",
        "Cache-Control": "must-revalidate",
        Pragma: "public",
        "Content-Length": stats.size.toString(),
      },
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
