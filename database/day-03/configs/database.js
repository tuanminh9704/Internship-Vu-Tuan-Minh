
import mysql from 'mysql2/promise';
 
const conn = mysql.createPool({
     host: "localhost",
     user: 'root',
     password: '@M972004abc',
     database: 'product_db',
 })
 
conn.connect((err) => {
     if (err) throw err;
     console.log("Connected!");
});

export default conn;
 