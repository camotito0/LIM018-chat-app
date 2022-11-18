/* eslint-disable */
const client = require('../db');

const updateUser = async (req, res) => {
    try {
        const {id} = req.params;
        const {username, email, password} = req.body;
        const user = await client.query(`UPDATE users SET username = $1, email = $2, parssword = $3
        WHERE id = $4 RETURNING *`, [username, email, password, id]);
        res.status(200).send({message:'User updated', user: user.rows})
    } catch(err) {
        res.status(500).send(err.message)
    }
}

const deleteUser = async (req, res) => {
    try {
        const {id} = req.params;
        await client.query(`DELETE FROM users WHERE id = $1`, [id]);
        res.status(200).send({message:'User deleted'})
    } catch(err) {
        res.status(500).send(err.message)
    }
}

const getUsers = async (req, res) => {
    try {
        const users = await client.query('SELECT * FROM users');
        res.status(200).send({message: 'All users', users: users.rows})
    } catch(err) {
        res.status(500).send(err.message)
    }
}

module.exports = {
    updateUser,
    deleteUser,
    getUsers
}