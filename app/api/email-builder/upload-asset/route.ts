import axios from "@/config/axios.config";
import { API_URL } from "@/lib/api";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const form = await request.formData();

    const assetType = form.get("assetType");
    const type = form.get("type");
    const template_id = form.get("template_id");
    const file = form.get("file");
    const url = form.get("url");
    const url_base64 = form.get("url_base64");

    if (!assetType) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
    }

    let formData = new FormData();

    if (assetType === "upload" || assetType === "audio") {
      formData.append("file", file as any);
    } else if (assetType === "url") {
      formData.append("url", url as any);
    } else if (assetType === "base64") {
      formData.append("url_base64", url_base64 as any);
    }

    console.log(formData.get("file"));
    // Call the external API to upload the file
    const response = await axios.post(`${API_URL}/use  . n. rs/api/v1/file/upload`, {
      document: formData.get("file"),
    });

    const data = response.data.data;
    console.log(data);

    if (!data.success) {
      console.log("Yoooooooooooooooooooooooooooooooooooooooooooooooooooooooooo" + data.error);
    }

    // if (data.success) {
    //   // Return the file URL
    //   return NextResponse.json({ url: data.data.fileUrl });
    // } else {
    //   return NextResponse.json({ message: "Upload failed" }, { status: 500 });
    // }
  } catch (error) {
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
