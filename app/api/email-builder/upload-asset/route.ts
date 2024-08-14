import axios from "axios";
import { API_URL } from "@/lib/api";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    // Extract cookies or tokens from the request
    const cookies = request.cookies.getAll();
    const token = cookies.find((cookie) => cookie.name === "token")?.value;

    // Parse the form data
    const form = await request.formData();
    const assetType = form.get("assetType");
    const type = form.get("type");
    const template_id = form.get("template_id");
    const file = form.get("file");
    const url = form.get("url");
    const url_base64 = form.get("url_base64");

    if (!assetType || !type || !template_id) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
    }

    let fileUrl: string | null = null;

    if (assetType === "upload" || assetType === "audio") {
      if (file) {
        // Create a FormData object and append the file

        // Upload file to external API
        const uploadResponse = await axios.post(
          `${API_URL}/users/api/v1/file/upload`,
          {
            document: file,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
            timeout: 240000,
          }
        );

        fileUrl = uploadResponse.data.url; // Assume the API returns a URL for the uploaded file
      } else {
        return NextResponse.json({ message: "File is required for this asset type" }, { status: 400 });
      }
    } else if (assetType === "url") {
      if (url) {
        // Download file from URL and upload it to external API
        const fileResponse = await axios.get(url, { responseType: "arraybuffer" });
        const formData = new FormData();
        formData.append("file", new Blob([fileResponse.data]), "downloaded-file");

        const uploadResponse = await axios.post(`${API_URL}/users/api/v1/file/upload`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
          timeout: 240000,
        });

        fileUrl = uploadResponse.data.url;
      } else {
        return NextResponse.json({ message: "URL is required for this asset type" }, { status: 400 });
      }
    } else if (assetType === "base64") {
      if (url_base64) {
        // Convert base64 to Blob and upload it to external API
        const base64Data = url_base64.split(",")[1];
        const formData = new FormData();
        formData.append("file", new Blob([Buffer.from(base64Data, "base64")]), "base64-file");

        const uploadResponse = await axios.post(`${API_URL}/users/api/v1/file/upload`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
          timeout: 240000,
        });

        fileUrl = uploadResponse.data.url;
      } else {
        return NextResponse.json({ message: "Base64 data is required for this asset type" }, { status: 400 });
      }
    } else {
      return NextResponse.json({ message: "Invalid asset type" }, { status: 400 });
    }

    // Return the URL of the uploaded asset
    if (fileUrl) {
      return NextResponse.json({ url: fileUrl });
    } else {
      return NextResponse.json({ message: "Upload failed" }, { status: 500 });
    }
  } catch (error: any) {
    console.error("Server error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
