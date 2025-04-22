export const validateProduct = (req, res, next) => {
    const {name, price, stock, description, category} = req.body;
    if(typeof(name) !== 'string' || name.trim() === ''){
        res.status(400).json({
            success: false,
            statusCode: false,
            message: "Name is not a string or is missing!",
        })
        return;
    }

    if(typeof(price) !== 'number' || price === 0){
        res.status(400).json({
            success: false,
            statusCode: false,
            message: "Price must be a number or is not zero",
        })
        return;
    }

    if(typeof(stock) !== 'number'){
        res.status(400).json({
            success: false,
            statusCode: false,
            message: "Stock must be a number",
        })
        return;
    }

    if(typeof(category) !== 'string' || category.trim() === ''){
        res.status(400).json({
            success: false,
            statusCode: false,
            message: "category is not a string or is missing!",
        });
        return;
    }

    next();
}