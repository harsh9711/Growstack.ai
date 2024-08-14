import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { API_URL } from "@/lib/api";

export async function POST(request: NextRequest) {
  try {
    // Extract cookies or tokens from the request
    const cookies = request.cookies.getAll();
    const token = cookies.find((cookie) => cookie.name === "token")?.value;

    // Parse FormData from the request body
    const formData = await request.formData();
    const parsedData: { [key: string]: any } = {};
    formData.forEach((value, key) => {
      parsedData[key] = value;
    });

    console.log("Parsed FormData:", parsedData);

    const response = await axios.post(
      `${API_URL}/users/api/v1/docs/save`,
      {
        doc_name: parsedData.type + "_" + parsedData.template_id + " Email template" || "Email template",
        doc_type: "HTML",
        workbook: "Documents",
        category: "email",
        doc_content: parsedData.content || "",
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Cookie: `token=${token}`,
        },
        timeout: 240000,
      }
    );

    return NextResponse.json(response.data);
  } catch (error: any) {
    console.error("Error:", error.response?.data || error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
