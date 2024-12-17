import { createClient } from "@extrahorizon/javascript-sdk";
import * as dotenv from "dotenv";
import fs from "fs/promises";

dotenv.config();

const exh = createClient({
  host: process.env.API_HOST,
  consumerKey: process.env.API_OAUTH_CONSUMER_KEY,
  consumerSecret: process.env.API_OAUTH_CONSUMER_SECRET,
  token: process.env.API_OAUTH_TOKEN,
  tokenSecret: process.env.API_OAUTH_TOKEN_SECRET,
});

// Load the picture from disk
const pictureBuffer = await fs.readFile('./picture.jpg');

// Upload the picture
const pictureFileDetails = await exh.files.create('picture.jpg', pictureBuffer);
const pictureFileToken = pictureFileDetails.tokens[0].token;

// Post measurement
const measurement = await exh.data.documents.create('picture-measurement', { pictureFileToken });

console.log(`Created measurement "${measurement.id}"`);
