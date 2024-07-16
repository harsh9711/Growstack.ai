import jsPDF from "jspdf";
import { Document, Packer, Paragraph, TextRun } from "docx";
import { saveAs } from "file-saver";

export const handleDownloadByText = (data: any) => {
  data.forEach((conversation: any) => {
    let content = `# ${conversation.title}\n`;
    conversation.data.forEach(
      ({
        user_prompt,
        response,
      }: {
        user_prompt: string;
        response: string;
      }) => {
        content += `\n## Message From You:\n${user_prompt}\n`;
        content += `## Message From GrowStackAI:\n${response}\n`;
      }
    );

    const blob = new Blob([content], { type: "text/plain" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.style.display = "none";
    a.href = url;
    a.download = `${conversation.title
      .replace(/[^a-z0-9]/gi, "_")
      .toLowerCase()}.txt`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
  });
};

export const handleDownloadByPDF = (data: any) => {
  const lineHeight = 7;
  const margin = 10;
  const pageWidth = 180;
  const pageHeight = 290;

  data.forEach((conversation: any) => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text(`# ${conversation.title}`, margin, lineHeight);
    doc.setFontSize(12);
    let y = lineHeight * 3;

    conversation.data.forEach(
      ({
        user_prompt,
        response,
      }: {
        user_prompt: string;
        response: string;
      }) => {
        const addText = (label: string, text: string) => {
          const labelLines = doc.splitTextToSize(label, pageWidth);
          const textLines = doc.splitTextToSize(text, pageWidth);
          const lines = [...labelLines, ...textLines];

          if (y + lines.length * lineHeight > pageHeight - margin) {
            doc.addPage();
            y = margin;
          }

          doc.text(labelLines, margin, y);
          y += labelLines.length * lineHeight;

          doc.text(textLines, margin, y);
          y += textLines.length * lineHeight + lineHeight;
        };

        addText(`## Message From You:`, user_prompt.trim());
        addText(`## Message From GrowStackAI:`, response.trim());
      }
    );

    doc.save(
      `${conversation.title.replace(/[^a-z0-9]/gi, "_").toLowerCase()}.pdf`
    );
  });
};

export const handleDownloadByDOCX = async (data: any) => {
  for (const conversation of data) {
    const doc = new Document({
      sections: [
        {
          properties: {},
          children: [
            new Paragraph({
              children: [
                new TextRun({
                  text: `# ${conversation.title}`,
                  bold: true,
                  size: 32,
                }),
              ],
            }),
            new Paragraph({}),
            ...conversation.data.flatMap(
              ({
                user_prompt,
                response,
              }: {
                user_prompt: string;
                response: string;
              }) => [
                new Paragraph({
                  children: [
                    new TextRun({
                      text: `## Message From You:`,
                      bold: true,
                      size: 24,
                    }),
                  ],
                }),
                new Paragraph({
                  children: [
                    new TextRun({
                      text: user_prompt,
                      size: 22,
                    }),
                  ],
                }),
                new Paragraph({
                  children: [
                    new TextRun({
                      text: `## Message From GrowStackAI:`,
                      bold: true,
                      size: 24,
                    }),
                  ],
                }),
                new Paragraph({
                  children: [
                    new TextRun({
                      text: response,
                      size: 22,
                    }),
                  ],
                }),
                new Paragraph({}),
              ]
            ),
          ],
        },
      ],
    });

    const buffer = await Packer.toBlob(doc);
    saveAs(
      buffer,
      `${conversation.title.replace(/[^a-z0-9]/gi, "_").toLowerCase()}.docx`
    );
  }
};
