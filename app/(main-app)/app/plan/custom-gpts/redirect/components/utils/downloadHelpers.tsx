// utils/downloadHelpers.ts
import { saveAs } from "file-saver";
import { jsPDF } from "jspdf";
import { Document, Packer, Paragraph, TextRun } from "docx";
import { Chat } from "../../../../ai-assistant/components/types";

export const downloadTxt = (chats: Chat[]) => {
  const content = chats.map((chat) => `User: ${chat.prompt}\nAssistant: ${chat.response}\n`).join("\n");
  const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
  saveAs(blob, "chat.txt");
};

const addTextToPdf = (content: string) => {
  const pdfDoc = new jsPDF();
  let yPos = 10;
  const pageHeight = pdfDoc.internal.pageSize.height;

  const lines = pdfDoc.splitTextToSize(content, 180);
  lines.forEach((line: string | string[]) => {
    if (yPos + 10 > pageHeight) {
      pdfDoc.addPage();
      yPos = 10;
    }
    pdfDoc.text(line, 10, yPos);
    yPos += 10;
  });

  return pdfDoc;
};

export const downloadPdf = (chats: Chat[]) => {
  const content = chats.map((chat) => `User: ${chat.prompt}\nAssistant: ${chat.response}\n`).join("\n\n");
  const pdfDoc = addTextToPdf(content);
  pdfDoc.save("chat.pdf");
};

export const downloadDocx = async (chats: Chat[]) => {
  const doc = new Document({
    sections: [
      {
        children: chats.map(
          (chat) =>
            new Paragraph({
              children: [
                new TextRun({ text: `User: ${chat.prompt}`, bold: true }),
                new TextRun("\n\n"),
                new TextRun({ text: `Assistant: ${chat.response}`, italics: true }),
                new TextRun("\n\n"),
              ],
            })
        ),
      },
    ],
  });

  const buffer = await Packer.toBuffer(doc);
  const blob = new Blob([buffer], { type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document" });
  saveAs(blob, "chat.docx");
};
