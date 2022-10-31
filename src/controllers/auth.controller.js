/* eslint-disable */
const client = require('../db');
const { encrypt, compare, generateToken } = require('../utils');

const registerUser = async (req, res) => {
    try {
        const {username, email, password} = req.body;
        const encryptPassword = encrypt(password);
        const values = [username, email, encryptPassword];
        const user = await client.query('INSERT INTO users(username, email, password) VALUES($1, $2, $3) RETURNING *', values)
        // generate token
        const token = generateToken({user_id: user.rows[0].id, email: email});
        // save token
        user.rows[0].token = token;
        res.status(200).header('authorization', token).send({message: 'user added', user: user});
    } catch(err) {
        res.status(500).send(err.message)
    }
}

const loginUser = async (req, res) => {
    try {
        const {email, password} = req.body;
        const user = await client.query('SELECT * FROM users WHERE email = $1', [email]);
        if(user && (compare(password, user.rows[0].password))) {
            // generate token
            const token = generateToken({user_id: user.rows[0].id, email: email});
            // save token
            user.rows[0].token = token;
            res.status(200).header('authorization', token).send({message: 'user logged', user: user});
        }
        res.status(400).send('Invalid credentials');

    } catch(err) {
        res.status(500).send(err.message)
    }
}

module.exports = {
    registerUser,
    loginUser
}