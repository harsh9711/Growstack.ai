import axios from "axios";

const downloadPdf = async (
  plainTextContent: any,
  userInput: any,
  fileName: string
) => {
  try {
    const response = await axios({
      url: `http://localhost:8081/users/api/v1/generate-pdf/pdf`,
      method: "POST",
      responseType: "blob",
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        text: plainTextContent,
        language: userInput?.language,
        fileName: fileName,
      },
    });

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
