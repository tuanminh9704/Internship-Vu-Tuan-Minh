import morgan from "morgan";
import fs from 'fs'

const ip = morgan.token('ip', (req) => req.ip || req.remoteAddress || '-');
const accessLogStream = fs.createWriteStream('access.log', { flags: 'a' })

const ipLogger = morgan(':ip :method :url :response-time', {
    stream: accessLogStream
});

export default ipLogger;


