import conn from "../../configs/db.js";

export const getOrderByUserId = async (req, res) => {
    try {
        const userId = req.user.id;
        const [orders] = await conn.query('SELECT * FROM order WHERE user id = ?', [userId]);
        res.status(200).json({
            success: true,
            statusCode: 200,
            message: 'Get all orders successfully!',
            data: orders
        })
    } catch (error) {
        console.log("[ERROR]: ", error.message);
        res.status(500).json({
            success: false,
            statusCode: 500,
            message: 'Internal Server Error!',
            error: error.message,
        })
    }

}

export const addNewOrders = async (req, res) => {
    try {
        const {products} = req.body;
        const userId = req.user.id;
        let totalPrice = 0;
        const productsInfo = [];
        for (const item of products) {
            const [product] = await conn.query('SELECT * FROM products WHERE id = ?', [item.productId]);
            if(product.length === 0) {
                res.status(404).json({
                    success: false,
                    statusCode: 404,
                    message: 'Product is not found!'
                })
                return;
            }
            const newStock = product[0].stock - item.quantity;
            if(newStock < 0) {
                res.status(400).json({
                    success: false,
                    statusCode: 400,
                    message: 'Product is out of stock!'
                })
                return;
            }
            await conn.query('UPDATE products SET stock = ? WHERE id = ?', [newStock, item.productId]);
            totalPrice += item.quantity * product[0].price;
            productsInfo.push({
                productId: item.productId,
                quantity: item.quantity,
                price: product[0].price
            })
        }
        const sqlInsertOrderCommand = `
            INSERT INTO orders (user_id, total_price) VALUE (?, ?)
        `;
        const [order] = await conn.query(sqlInsertOrderCommand, [userId, totalPrice]);
        const orderId = order.insertId;
        const sqlInsertOrderItemCommand = `
            INSERT INTO order_items (order_id, product_id, quantity, price) VALUE (?, ?, ?, ?);
        `;
        for (const productInfo of productsInfo) {
            await conn.query(sqlInsertOrderItemCommand, [
                orderId,
                productInfo.productId,
                productInfo.quantity,
                productInfo.price,
            ])
        }

        res.json({
            success: true,
            statusCode: 200,
            message: 'Add new orders successfully!',
        })      
    } catch (error) {
        console.log("[ERROR]: ", error);
        res.status(500).json({
            success: false,
            statusCode: 500,
            message: 'Internal Server Error!',
            error: error.message
        })   
    }
}
