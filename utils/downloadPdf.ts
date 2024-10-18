import instance from "@/config/axios.config";
import { API_URL } from "@/lib/api";

const downloadPdf = async (
  plainTextContent: any,
  userInput: any,
  fileName: string
) => {
  try {
    const response = await instance.post(
      `${API_URL}/users/api/v1/generate-pdf/pdf`,
      {
        text: plainTextContent,
        language: userInput?.language,
        fileName: fileName,
      },
      {
        responseType: "blob",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const blob = new Blob([response.data], { type: "application/pdf" });
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.download = `${fileName}.pdf`;
    link.click();
    window.URL.revokeObjectURL(link.href);
  } catch (error) {
    console.error("Error downloading the PDF:", error);
  }
};
export default downloadPdf;
