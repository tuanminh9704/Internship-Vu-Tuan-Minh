import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename =  fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const errorFilePath = path.join(__dirname, 'error.txt');
const warningFilePath = path.join(__dirname, 'warning.txt');
// console.log(errorFilePath);

const reader = fs.createReadStream(errorFilePath)
reader.on('data', (chunk) => {
    const chunkStrArrays = chunk.toString().split(" ");
    let newStr = '';
    for(let i = 0 ; i < chunkStrArrays.length; i++) {
        if(chunkStrArrays[i] === 'ERROR'){
            newStr += 'Warning ';
        }
        else{ 
            newStr += chunkStrArrays[i] + ' ';
        }
    }
    fs.writeFileSync(warningFilePath, newStr);
})