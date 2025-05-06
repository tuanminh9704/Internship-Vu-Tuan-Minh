import conn from "../../configs/db.js";

export const getAllProduct = async (req, res) => {
    try {
        const params = [];
        let { page, limit, name, category } = req.query;

        page = isNaN(page) ? 1 : parseInt(page);
        limit = isNaN(limit) ? 4 : parseInt(limit);  
        let sqlCommand = `SELECT * FROM products`;
        let condition = "";

        if(name) {
            condition += " WHERE name LIKE ?";
            params.push(`%${name.trim()}%`);
        }

        if(category) {
            if (condition) {
                condition += " AND ";
            } else {
                condition += " WHERE ";
            }
            condition += "category = ?";
            params.push(category.trim());
        }

        sqlCommand += condition;

        const [countProduct] = await conn.query(sqlCommand, params);
        const totalPages = Math.ceil(countProduct.length / parseInt(limit));
        const offset = (page - 1) * limit;
        params.push(parseInt(limit), parseInt(offset));

        const [products] = await conn.query(
            `${sqlCommand} LIMIT ? OFFSET ?`,
            params
        );

        res.status(200).json({
            success: true,
            statusCode: 200,
            message: 'Get All Product Successfully!',
            data: products,
            pagination: {
                currentPage: parseInt(page),
                pageSize: parseInt(limit),
                totalItem: parseInt(countProduct.length),
                totalPages: parseInt(totalPages)
            }
        });
    } catch (error) {
        console.log("[ERROR: ]", error.message);
        res.status(500).json({
            success: false,
            statusCode: 500,
            message: 'Internal Server Error!',
            error: error.message,
        });
    }
};
