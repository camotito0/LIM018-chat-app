/* eslint-disable */
const {Client} = require('pg');

const client = new Client({
    user: 'postgres',
    host: 'localhost',
    password: 'postgres',
    database: 'default_database',
    port: 5432,
});

module.exports = client;