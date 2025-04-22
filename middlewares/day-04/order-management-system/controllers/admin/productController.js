import conn from "../../configs/db.js";

export const addNewProduct = async (req, res) => {
    try {
        const {name, price, stock, description, category} = req.body;
        if(
            name.trim() === "" || isNaN(price) || isNaN(stock) || description.trim() === "" || category.trim() === ""
        ) {
            res.status(400).json({
                success: false,
                statusCode: 400,
                message: 'Name, price, stock, description, category is invalid!',
            });
        };
        const sqlInsertProductCommand = `
            INSERT INTO products (name, price, stock, description, category)
            VALUES 
            (?, ?, ? ,?, ?)
        `;
        await conn.query(sqlInsertProductCommand, [name, price, stock, description, category]);        
        res.status(200).json({
            success: true,
            statusCode: 200,
            message: 'Add New Product Successfully!',
            data: req.body
        })

    } catch (error) {
        console.log('[ERROR:]', error.message);
        res.status(500).json({
            success: false,
            statusCode: 500,
            message: 'Internal Server Error!',
            error: error.message
        })
    }
}

export const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, price, stock, description, category } = req.body;

        if (
            !id || isNaN(id) ||
            name.trim() === "" || isNaN(price) || isNaN(stock) ||
            description.trim() === "" || category.trim() === ""
        ) {
            return res.status(400).json({
                success: false,
                statusCode: 400,
                message: 'ID, name, price, stock, description, category is invalid!',
            });
        }

        const sqlUpdateCommand = `
            UPDATE products 
            SET name = ?, price = ?, stock = ?, description = ?, category = ?
            WHERE id = ?
        `;

        const [result] = await conn.query(sqlUpdateCommand, [name, price, stock, description, category, id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                statusCode: 404,
                message: 'Product not found!'
            });
        }

        res.status(200).json({
            success: true,
            statusCode: 200,
            message: 'Product updated successfully!',
            data: { id, name, price, stock, description, category }
        });

    } catch (error) {
        console.log('[ERROR:]', error.message);
        res.status(500).json({
            success: false,
            statusCode: 500,
            message: 'Internal Server Error!',
            error: error.message
        });
    }
};

export const deleteProduct = async (req, res) => {
    try {
        const id = req.params.id;
        const [deletedProduct] = await conn.query('DELETE FROM products WHERE id = ?', [id]);
        res.status(200).json({
            success: true,
            statusCode: 200,
            message: 'Deleted Product Successfully!',
            data: deletedProduct,
        })
    } catch (error) {
        console.log('[ERROR]: ', error.message);
        res.status(500).json({
            success: false,
            statusCode: 500,
            message: 'Internal Server Error!',
            error: error.message,
        })
    }
}
