const { google } = require("googleapis");
const gcred = require("./spreadsheet-405108-5facb2fc3a3b.json");

const auth = new google.auth.GoogleAuth({
  credentials: gcred,
  scopes: ["https://www.googleapis.com/auth/documents"],
});

const docsApi = google.docs({ version: "v1", auth });

const docIdAiResume = "1htsIHLaMIsufpxjpi6Bvdp-OBDvJHhEB5I_4KOF56m8";

return docsApi.documents
  .batchUpdate({
    documentId: docIdAiResume,
    requestBody: {
      requests: [
        {
          replaceAllText: {
            containsText: { text: "{{name}}", matchCase: true },
            replaceText: "Mostafijur Rahman",
          },
        },
      ],
    },
  })
  .then((res) => {
    console.log("response: ", res);
  })
  .catch((error) => {
    console.log(error);
  });
