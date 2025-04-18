import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename =  fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const errorFilePath = path.join(__dirname, 'error.log');
console.log(errorFilePath);

export const notFound = (req, res, next) => {
  const message = '404 Not Found Page!';

  fs.writeFileSync(errorFilePath, message);

  res.status(404).json({
    code: 404,
    message: message
  })
}

export const internalServerError = (req, res, next) => {
  const message = 'Server Error!';
  fs.writeFileSync(errorFilePath, message);
  const environment = process.env.ENVIRONMENT;
  if(environment === 'dev') {
    res.status(500).json({
      code: 500,
      message: message
    })
  }
  else if(environment === 'prod') {
    res.status(500).json({
      code: 500,
      message: 'Server hiện đang bảo trì!'
    })
  }
}

