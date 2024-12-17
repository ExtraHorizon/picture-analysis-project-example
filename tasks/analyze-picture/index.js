import { createClient } from "@extrahorizon/javascript-sdk";

const exh = createClient({
  host: process.env.API_HOST,
  consumerKey: process.env.API_OAUTH_CONSUMER_KEY,
  consumerSecret: process.env.API_OAUTH_CONSUMER_SECRET,
  token: process.env.API_OAUTH_TOKEN,
  tokenSecret: process.env.API_OAUTH_TOKEN_SECRET,
});

export async function handler(task) {
  const measurement = await exh.data.documents.findById(task.data.schemaId, task.data.documentId);

  const template = await exh.templates.findByName('picture-report');
  const report = await exh.templates.resolveAsPdf(template.id, {
    content: {
      pictureUrl: `https://${process.env.API_HOST}/files/v1/${measurement.data.pictureFileToken}/file`,
    }
  });

  const reportFile = await exh.files.create('report.pdf', report);
  const reportFileToken = reportFile.tokens[0].token;

  await exh.data.documents.update(task.data.schemaId, task.data.documentId, {
    reportFileToken: reportFileToken,
  });
}