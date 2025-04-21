import bcrypt, { compareSync } from 'bcrypt';
import conn from '../../configs/db.js';
import { generateAccessToken } from '../../utils/jwt.js';

export const register = async (req, res) => {
    try {
        const saltRounds = 10;
        const salt = bcrypt.genSaltSync(saltRounds);
        const {name, email, password} = req.body;
            
        if(name.trim() === "" || email.trim() === "" || password.trim() === "") {
            res.status(400).json({
                success: false,
                statusCode: 400,
                message: "Name, email or password is missing!",
            })
            return;
        }

        const [userExisted] = await conn.query('SELECT * FROM users WHERE email = ?', [email]);
        if(userExisted.length > 0) {
            res.status(400).json({
                success: false,
                statusCode: 400,
                message: "Email is existing!"
            })
            return;
        }

        const hashedPassword = await bcrypt.hash(password, salt);
        await conn.query('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', [
            name,
            email,
            hashedPassword
        ])
    
        res.status(200).json({
            success: true,
            statusCode: 200,
            message: "Resgister Successfully!"
        })
    } catch (error) {
        console.log("[ERROR]: ", error);
        res.status(500).json({
            success: false,
            statusCode: 500,
            message: "Internal Server Error"
        })
    }
}

export const login = async (req, res) => {
    try {
        const {email, password} = req.body;

        if(email.trim() === "" || password.trim === ""){
            res.status(400).json({
                success: false,
                statusCode: 400,
                message: 'Email or password is missing!'
            });
            return;
        }
        const [userExisted] = await conn.query('SELECT * FROM users WHERE email = ?', [email]);
        if(!userExisted.length) {
            res.status(400).json({
                success: false,
                statusCode: 400,
                message: "Email isn't existing!"
            })
            return;
        }

        const isMatch = await bcrypt.compare(password, userExisted[0].password);
        if(!isMatch) {
            res.status(400).json({
                success: false,
                statusCode: 400,
                message: "Password is incorrect!"
            })
            return;  
        }
        const accessToken = generateAccessToken(userExisted[0]);
        // console.log(accessToken);

        res.status(200).json({
            success: true,
            statusCode: 200,
            message: 'Login is successfully!',
            accessToken: accessToken
        })
    } catch (error) {
        console.log("[ERROR]: ", error);
        res.status(500).json({
            success: false,
            statusCode: 500,
            message: "Internal Server Error"
        })
    }

}