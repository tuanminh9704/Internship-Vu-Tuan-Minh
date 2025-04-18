import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const fileUrl = path.join(__dirname, 'log.txt');
const timestamps = new Date();
const sayGreet = `Hello at ${timestamps}\n`;

fs.writeFile(fileUrl, sayGreet, () => {
  console.log('Save is successfully!');
});