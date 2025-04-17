import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename =  fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const inputPath = path.join(__dirname, 'input.txt');
const outputPath = path.join(__dirname, 'output.txt');

const data = fs.readFileSync(inputPath);
const writeStream = fs.createWriteStream(outputPath);
writeStream.write(data);
writeStream.end();
