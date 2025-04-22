import conn from "../../configs/db.js";

export const getAllProduct = async (req, res) => {
    try {
        const params = [];
        const { page, limit, name, category } = req.query;
        let sqlCommand = `
            SELECT * FROM products WHERE
        `;
        let condition = "";
        if(name) {
            condition += "name LIKE ?";
            params.push(name.trim());
        }
        if(category) {
            condition += " AND ";
            condition += "category = ?";   
            params.push(category.trim());   
        }
        params.push(parseInt(limit));
        sqlCommand += condition

        const [countProduct] = await conn.query(sqlCommand, params);
        const totalPages = Math.ceil(countProduct.length / parseInt(limit));
        const offset = (page - 1) * limit;
        params.push(parseInt(offset));
        // console.log(params);
        
        const [products] = await conn.query(
            `${sqlCommand} LIMIT ? OFFSET ?`,
            params
        );
        res.status(200).json({
            success: true,
            statusCode: 200,
            message: 'Get All Product Successfully!',
            data: products,
            page: parseInt(page),
            totalPages: totalPages,
        })
    } catch (error) {
        console.log("[ERROR: ]", error.message);
        res.status(500).json({
            success: false,
            statusCode: 500,
            message: 'Internal Server Error!',
            error: error.message,
        });
    }
}
