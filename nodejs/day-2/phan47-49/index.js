import express from "express";

const app = express();
const port = 3000;

const users = [
    {
        id: 1,
        name: 'nguyen van a',
    },
    {
        id: 2,
        name: 'nguyen van b',
    }
]

app.get('/', (req, res) => {
    try {
        res.status(200).json({
            code: 200,
            data: users,
        })
    } catch (error) {
        res.status(500).json({
            code: 500,
            message: error,
        })
    }
})

app.post('/', (req, res) => {
    try {
        const newUser = {id: 3, name: 'nguyen van c'};
        users.push(newUser);
        res.status(200).json({
            code: 200,
            data: newUser,
        })
    } catch (error) {
        res.status(500).json({
            code: 500,
            message: error,
        })
    }
})

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
})