
import mysql from 'mysql2';
 
const conn = mysql.createConnection({
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
 