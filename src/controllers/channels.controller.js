/* eslint-disable */
const client = require('../db');

const createChannel =  async (req,res) => {
    try {
        const {name, user_id} = req.body;
        const channel = await client.query(`INSERT INTO channels(user_id, name) VALUES($1, $2) returning *`,
        [user_id, name])
        res.status(200).send({message:'Channel added', channel:channel})
    } catch(err) {
        res.status(500).send(err.message)
    }
}

const updateChannel = async (req, res) => {
    try {
        const {id} = req.params;
        const {name} = req.body;
        const channel = await client.query(`UPDATE channels SET name =$1 WHERE id = $2 RETURNING *`, [name, id]);
        res.status(200).send({message:'Channel updated', channel:channel})
    } catch(err) {
        res.status(500).send(err.message)
    }
}

const deleteChannel = async (req, res) => {
    try {
        const {id} = req.params;
        await client.query(`DELETE FROM channels WHERE id = $1`, [id]);
        res.status(200).send({message:'Channel deleted'})
    } catch(err) {
        res.status(500).send(err.message)
    }
}

const getUserChannelsJoin =  async (req, res) => {
    try {
        const channels = await client.query(`SELECT u.id, u.username, c.id, c.name FROM users u, channels c WHERE u.id = c.user_id`);
        res.status(200).send({message:'Channels by user', channels:channels.rows})
    } catch(err) {
        res.status(500).send(err.message)
    }
}

const getAllChannels = async (req, res) => {
    try {
        const channels = await client.query(`SELECT * FROM channels`);
        res.status(200).send({message:'All channels', channels:channels})
    } catch(err) {
        res.status(500).send(err.message)
    }
}

const addUserToChannel = async (req, res) => {
    try {
        const {channel_id, user_id} = req.body;
        await client.query(`INSERT INTO channels_users(channel_id, user_id) VALUES($1,$2)`, [channel_id, user_id]);
        res.status(200).send({message:'User added to channel'})
    } catch(err) {
        res.status(500).send(err.message)
    }
}

const usersAddedToChannels = async (req, res) => {
    try {
        const channels = await client.query(`SELECT u.id, u.username, c.id, c.name FROM users AS u JOIN channels_users AS cu ON cu.user_id = u.id
        JOIN channels AS c ON cu.channel_id = c.id`);
        res.status(200).send({message:'User added to channel', channels: channels})
    } catch(err) {
        res.status(500).send(err.message)
    }
}

module.exports = {
    createChannel,
    updateChannel,
    deleteChannel,
    getUserChannelsJoin,
    getAllChannels,
    addUserToChannel,
    usersAddedToChannels
}