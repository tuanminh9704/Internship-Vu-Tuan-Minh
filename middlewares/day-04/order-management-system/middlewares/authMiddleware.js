import jwt from "jsonwebtoken";
const SECRET_KEY_JWT =  process.env.SECRET_KEY_JWT;

export const verifyTokenMiddleware = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; 

    if(!token){
        res.error("Access token is invalid!");
    }
    jwt.verify(token, SECRET_KEY_JWT, (err, user) => {
        if(err){
            res.error("Access token is invalid!");
            return;
        }
        next();
    })
} 