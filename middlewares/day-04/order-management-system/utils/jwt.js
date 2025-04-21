import jwt from "jsonwebtoken";
const SECRET_KEY_JWT =  process.env.SECRET_KEY_JWT;

export const generateAccessToken = (user) => {
    const accessToken = jwt.sign({id: user.id}, SECRET_KEY_JWT, {expiresIn: '1h'});

    return accessToken;
}