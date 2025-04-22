import jwt from "jsonwebtoken";
import conn from "../configs/db.js";
const SECRET_KEY_JWT =  process.env.SECRET_KEY_JWT;

export const verifyTokenMiddleware = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; 

    if(!token){
        res.status(404).json({
            success: false,
            statusCode: 404,
            message: 'Access token is missing!',
        })
        return;
    }
    jwt.verify(token, SECRET_KEY_JWT, (err, user) => {
        if(err){
            res.status(400).json({
                success: false,
                statusCode: 404,
                message: 'Access token is invalid!',
            })
            return;
        }
        req.user = user;
        next();
    })
} 

export const verifyUserAdmin = async (req, res, next) => {
    const [user] = await conn.query('SELECT * FROM users WHERE id = ?', [req.user.id]);
    if(user[0].role !== 'admin') {
        res.status(403).json({
            success: false,
            statusCode: 403,
            message: 'you are not authorized!'
        })
        return;
    }
    next();
}