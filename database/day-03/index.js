import express from 'express';
import conn from './configs/database.js';
import bodyParser from 'body-parser';

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/products', (req, res) => {
    try {
        let mysqlSelectCommand = 'SELECT * FROM products';
        const products = conn.query(mysqlSelectCommand, (err, result, fields) => {
            if(err) throw err;
            res.status(200).json({
                code: 200,
                data: result,
                message: 'Success!'
            })
        });
    } catch (error) {
        res.status(500).json({
            code: 500,
            message: 'Server Error'
        })
    }
})

app.post('/products', (req ,res) => {
    try {
        let mysqlInsertCommand = 'INSERT INTO products (id, name, price, description, stock) values '
        const newProduct = req.body;
        if(newProduct.name.trim() === "" || isNaN(newProduct.price) || newProduct.description.trim() === "" || isNaN(newProduct.price) || isNaN(newProduct.stock)){
            res.status(500).json({
                code: 500,
                message: 'Name, price, description or stock is invalid!',
            })
        }
    
        mysqlInsertCommand = mysqlInsertCommand + ` (${newProduct.id}, '${newProduct.name}', ${newProduct.price}, '${newProduct.description}', ${newProduct.stock})`;
    
        conn.query(mysqlInsertCommand, (err, result, fields) => {
            if(err) throw err;
            
            res.status(200).json({
                code: 200,
                message: 'Added new product successfully!',
            })
        })
    } catch (error) {
        res.status(500).json({
            code: 500,
            message: 'Server Error!'
        })
    }
})

app.put('/products/:id', (req, res) => {
    try {
        const sqlUpdateCommand = `
        UPDATE products 
        SET name = ?, price = ?, description = ?, stock = ? 
        WHERE id = ?
        `;
        const updatedProduct = req.body;
        const id = req.params.id;
        const value = [
            updatedProduct.name,
            updatedProduct.price,
            updatedProduct.description,
            updatedProduct.stock
        ]
    
        conn.query(sqlUpdateCommand, value, (err, result, fields) => {
            res.status(200).json({
                code: 200,
                data: result,
                message: 'Updated Successfully!'
            })
        }) 
    } catch (error) {
        res.status(500).json({
            code: 500,
            message: 'Server Error!',
        })   
    }
    
})


app.delete('/products/:id', (req, res) => {
    try {
        const sqlDeleteCommand = `DELETE FROM products WHERE id = ?`;
        const id = req.params.id;
        const value = [id];

        conn.query(sqlDeleteCommand, value, (err, result, fields) => {
            if(err) throw err;
            res.status(200).json({
                code: 200,
                data: result,
                message: 'Deleted Successfully!',
            })
        })
    } catch (error) {
        res.status(500).json({
            code: 500,
            message: 'Server Error',
        })
    }

})

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
})