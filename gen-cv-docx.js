const fs = require("fs");
const {
  Document,
  Packer,
  Paragraph,
  TextRun,
  Table,
  TableRow,
  TableCell,
  WidthType,
  AlignmentType,
} = require("docx");

const createComplexCV = (data) => {
  const doc = new Document({
    sections: [
      {
        properties: {},
        children: [
          new Paragraph({
            children: [
              new TextRun({
                text: data.name,
                bold: true,
                size: 36,
              }),
            ],
            alignment: AlignmentType.CENTER,
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: data.email,
                size: 24,
              }),
            ],
            alignment: AlignmentType.CENTER,
          }),
          new Paragraph({
            text: "",
            spacing: {
              after: 240,
            },
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: "Work Experience",
                bold: true,
                size: 30,
              }),
            ],
            spacing: {
              after: 240,
            },
          }),
          new Table({
            rows: data.workExperience.map(
              (exp) =>
                new TableRow({
                  children: [
                    new TableCell({
                      children: [
                        new Paragraph({
                          children: [
                            new TextRun({
                              text: `${exp.position} at ${exp.company}`,
                              bold: true,
                              size: 26,
                            }),
                            new TextRun({
                              text: ` (${exp.start} - ${exp.end})`,
                              italics: true,
                              size: 26,
                            }),
                          ],
                        }),
                      ],
                    }),
                    new TableCell({
                      children: [
                        new Paragraph({
                          text: exp.description,
                          size: 24,
                        }),
                      ],
                    }),
                  ],
                })
            ),
            width: {
              size: 100,
              type: WidthType.PERCENTAGE,
            },
          }),
          new Paragraph({
            text: "",
            spacing: {
              after: 240,
            },
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: "Education",
                bold: true,
                size: 30,
              }),
            ],
            spacing: {
              after: 240,
            },
          }),
          new Table({
            rows: data.education.map(
              (edu) =>
                new TableRow({
                  children: [
                    new TableCell({
                      children: [
                        new Paragraph({
                          children: [
                            new TextRun({
                              text: `${edu.degree} at ${edu.institution}`,
                              bold: true,
                              size: 26,
                            }),
                            new TextRun({
                              text: ` (${edu.start} - ${edu.end})`,
                              italics: true,
                              size: 26,
                            }),
                          ],
                        }),
                      ],
                    }),
                    new TableCell({
                      children: [
                        new Paragraph({
                          text: edu.description,
                          size: 24,
                        }),
                      ],
                    }),
                  ],
                })
            ),
            width: {
              size: 100,
              type: WidthType.PERCENTAGE,
            },
          }),
        ],
      },
    ],
  });

  return doc;
};

const data = {
  name: "John Doe",
  email: "john.doe@example.com",
  workExperience: [
    {
      position: "Software Developer",
      company: "Tech Company",
      start: "Jan 2020",
      end: "Present",
      description:
        "Developed web applications using JavaScript, React, and Node.js.",
    },
    {
      position: "Intern",
      company: "Another Company",
      start: "Jun 2019",
      end: "Dec 2019",
      description:
        "Assisted in developing internal tools and automated scripts.",
    },
  ],
  education: [
    {
      degree: "B.Sc. in Computer Science",
      institution: "University of Example",
      start: "Sep 2016",
      end: "May 2020",
      description: "Graduated with honors.",
    },
  ],
};

const doc = createComplexCV(data);

Packer.toBuffer(doc)
  .then((buffer) => {
    fs.writeFileSync("ComplexCV.docx", buffer);
    console.log("ComplexCV.docx generated successfully.");
  })
  .catch((error) => {
    console.error("Error generating the CV:", error);
  });
