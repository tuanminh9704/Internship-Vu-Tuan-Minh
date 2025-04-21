import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
dotenv.config();
 
const conn = mysql.createPool({
     host: process.env.HOST_NAME,
     user: process.env.USER_NAME,
     password: process.env.PASSWORD,
     database: process.env.DATABASE,
})

console.log("Database connected successfully!");

export default conn;
 