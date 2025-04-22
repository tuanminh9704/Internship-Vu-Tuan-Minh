import conn from '../../configs/db.js';

export const getAllUsers = async (req, res) => {
    try {
        const role = 'user';
        const [users] = await conn.query('SELECT * FROM users where role = ?', [role]);
        // console.log(users);
        res.status(200).json({
            success: true,
            statusCode: 200,
            message: 'Get all users successfully!',
            data: users
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            statusCode: 500,
            message: 'Internal Server Error',
            error: error.message
        })   
    }
}

export const changeStatusUser = async (req, res) => {
    try {
        const id = req.params.id;
        const [user] = await conn.query('SELECT * FROM users where id = ?', [id]);
        if(!user[0]){
            res.status(404).json({
                success: false,
                statusCode: 404,
                message: 'Not Found user',
            });
            return;
        }
        if(!user[0].locked) {
            const updatedUser = await conn.query('UPDATE users SET locked = ? WHERE id = ?', [true, id]);
            res.status(200).json({
                success: true,
                statusCode: 200,
                message: 'Locked User Successfully!',
                data: updatedUser
            });
        }
        else {
            const updatedUser = await conn.query('UPDATE users SET locked = ? WHERE id = ?', [false, id]);
            res.status(200).json({
                success: true,
                statusCode: 200,
                message: 'Unlocked User Successfully!',
                data: updatedUser
            });
        }
        
    } catch (error) {
        res.status(500).json({
            message: true,
            statusCode: 500,
            message: 'Internal Server Error!',
            message: error.message,
        })
    }
}