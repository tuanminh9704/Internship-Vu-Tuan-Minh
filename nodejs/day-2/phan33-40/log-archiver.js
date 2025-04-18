import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url';
import zlib from 'zlib';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const logUrl = path.join(__dirname, 'logs');

const filesLog = fs.readdirSync(logUrl, );

for (const file of filesLog) {
    const filePath = path.join(logUrl, file);
    const compressedFilePath = filePath + '.gz';
    const  fileName = fs.createReadStream(filePath);
    const compressedFileName = fs.createWriteStream(compressedFilePath);
    const gzip = zlib.createGzip();

    fileName.pipe(gzip).pipe(compressedFileName);
}

console.log('Compessed all file in foder logs successfully!');


