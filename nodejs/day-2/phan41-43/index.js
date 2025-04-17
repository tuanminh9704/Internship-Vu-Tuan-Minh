import http from 'http';
import busboy from 'busboy';
import path, { dirname } from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import events from 'events';

const port = 3000;

const emitter = new events.EventEmitter();

emitter.on('upload:done', (saveTo, filename) => {
    // fs.createWriteStream(saveTo, `Upload ${filename} successfully!`);
    console.log('Upload file successfully!');
})

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const saveTo = path.join(__dirname, 'uploads.log');

const server = http.createServer((req, res) =>  {
    if(req.url === '/upload' && req.method === 'POST'){
        const bb = busboy({ headers: req.headers });
        bb.on('file', (filename, file, info) => {
            const writeStream = fs.createWriteStream(saveTo);
            file.pipe(writeStream);
            file.on('end', () => {
                emitter.emit('upload:done', saveTo, filename)
            })
        })
        bb.on('close', () => { 
            res.writeHead(200, { 'Connection': 'close' });
            res.end('Upload successfully!');
        });
        req.pipe(bb);
        return;
    }   
    res.writeHead(404);
    res.end();
});

server.listen(port, () => {
    console.log(`Server listening on port ${port}`);
})