export const auth = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if(authHeader !== 'Bearer token123') {
        res.status(401).json({
            code: 401, 
            message: '401 Unauthorized'
        })
    }
    next();
}