import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import path from "path";
import { promises as fs } from "fs";
import unzipper from "unzipper";
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

  const { files } = await formParse();

  if (!files.file) {
    return NextResponse.json({ message: "No files were uploaded." }, { status: 400 });
  }

  const id = uuidv4();
  const tmpzip = path.join(process.cwd(), "tmp", "uploaded.zip");
  const name = path.join(templatesDir, "custom", id);
  const file = files.file as File;

  await fs.writeFile(tmpzip, await fs.readFile(file.filepath));

  await fs
    .createReadStream(tmpzip)
    .pipe(unzipper.Extract({ path: name }))
    .promise();

  if (!fs.existsSync(path.join(name, "index.html"))) {
    return NextResponse.json({ message: "Cannot find 'index.html' in the ZIP package" }, { status: 400 });
  }

  return NextResponse.redirect(`/design?id=${id}&type=custom`);
}
