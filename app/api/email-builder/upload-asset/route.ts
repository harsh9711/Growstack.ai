import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import formidable from "formidable";
import { IncomingForm, File } from "formidable";

const templatesDir = path.join(process.cwd(), "templates");

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(request: NextRequest) {
  const form = new IncomingForm();

  const formParse = () =>
    new Promise<{ fields: formidable.Fields; files: formidable.Files }>((resolve, reject) => {
      form.parse(request, (err, fields, files) => {
        if (err) reject(err);
        resolve({ fields, files });
      });
    });

  const { fields, files } = await formParse();

  const template_id = fields.template_id as string;
  const type = fields.type as string;
  const assetType = fields.assetType as string;

  const templatePath = path.join(templatesDir, type, template_id);

  try {
    await fs.access(templatePath);
  } catch (error) {
    return NextResponse.json({ message: "Template not found" }, { status: 404 });
  }

  let filename: string;
  let filepath: string;

  switch (assetType) {
    case "upload":
      const file = files.file as File;
      filename = file.originalFilename!.replace(/[^a-z0-9\._\-]+/i, "_");
      filepath = path.join(templatePath, filename);
      await fs.writeFile(filepath, await fs.readFile(file.filepath));
      return NextResponse.json({ url: filename });

    case "url":
    case "base64":
      filename = uuidv4();
      filepath = path.join(templatePath, filename);
      const content = assetType === "url" ? fields.url : fields.url_base64;
      await fs.writeFile(filepath, content as string);
      return NextResponse.json({ url: filename });

    default:
      return NextResponse.json({ message: "Invalid asset type" }, { status: 400 });
  }
}
