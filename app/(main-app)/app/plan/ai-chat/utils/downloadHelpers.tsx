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
  data.forEach((conversation: any) => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text(`# ${conversation.title}`, 10, 10);
    doc.setFontSize(12);
    let y = 20;

    conversation.data.forEach(
      ({
        user_prompt,
        response,
      }: {
        user_prompt: string;
        response: string;
      }) => {
        if (y > 280) {
          doc.addPage();
          y = 10;
        }
        doc.text(`## Message From You:`, 10, y);
        y += 7;
        doc.text(user_prompt, 10, y);
        y += 7;

        if (y > 280) {
          doc.addPage();
          y = 10;
        }
        doc.text(`## Message From GrowStackAI:`, 10, y);
        y += 7;
        doc.text(response, 10, y);
        y += 10;
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
            ...conversation.data
              .map(
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
                        size: 24,
                      }),
                    ],
                  }),
                  new Paragraph({}),
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
                        size: 24,
                      }),
                    ],
                  }),
                ]
              )
              .flat(),
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
