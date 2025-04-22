import conn from "../../configs/db.js"

export const getAllOrders = async (req, res) => {
    try {
        const [orders] = await conn.query('SELECT * FROM orders');
        res.status(200).json({
            success: true,
            statusCode: 200,
            message: 'Get all orders successfully!',
            data: orders
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

export const updateOrderStatus = async (req, res) => {
    try {
        const id = req.params.id;
        const {status} = req.body;
        console.log(status);
        if(status !== 'pending' && status !== 'paid' && status !== 'shipped' && status !== 'cancelled') {
            res.status(400).json({
                success: false,
                statusCode: 400,
                message: 'Status is invalid!',
            });
            return;
        }
        const [updatedOrderStatus] = await conn.query('UPDATE orders SET status = ? WHERE id = ?', [status, id]);
        res.status(200).json({
            success: true,
            statusCode: 200,
            message: 'Updated order status successfully!',
            data: updatedOrderStatus
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