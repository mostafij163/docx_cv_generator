const fs = require("fs");
const PizZip = require("pizzip");
const Docxtemplater = require("docxtemplater");
const ImageModule = require("docxtemplater-image-module-free");

// Load the template file
const content = fs.readFileSync("./templates/temp1.docx", "binary");

// Create a new PizZip instance
const zip = new PizZip(content);

const img = new ImageModule({
  centered: false,
  fileType: "docx",
  getImage(tagValue, tagName) {
    console.log("tagValue: ", tagValue);
    return fs.readFileSync(tagValue, "binary");
  },
  getSize(img, tagValue, tagName) {
    return [150, 150];
  },
});
// Create a new Docxtemplater instance
const doc = new Docxtemplater(zip, {
  paragraphLoop: true,
  linebreaks: true,
  modules: [img],
});

// Define the data to replace the placeholders
const data = {
  name: "Mostafijur",
  l_name: "Rahman",
  title: "Software Engineer",
  institution: "Daffodil Int University",
  introduction:
    "Nulla incididunt do adipisicing commodo.Elit laborum laborum esse eiusmod.",
  degree: "BSc in Computer Science, University of Example",
  from: "2017-05-21",
  to: "2-21-04-22",
  job_title: "Software Engineer",
  job_description:
    "Nostrud sunt commodo dolore reprehenderit laboris in eu pariatur et aliqua.Do minim in tempor culpa.Qui quis anim ipsum labore deserunt culpa velit.Irure id nulla anim reprehenderit irure minim deserunt nostrud quis nostrud.Dolore consequat proident eiusmod in ex tempor ad aute minim laboris elit.",
  image: "./person1.jpg",
};

// Render the document
doc.render(data);

// Get the rendered document as a buffer
const buf = doc.getZip().generate({ type: "nodebuffer" });

// Save the buffer to a file
fs.writeFileSync("generated_cv.docx", buf);

console.log("CV generated successfully");
