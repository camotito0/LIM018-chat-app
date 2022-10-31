/* eslint-disable */
const bcrypt = require('bcryptjs');

const encrypt = (password) => {
    return bcrypt.hashSync(password, 10)
}

const compare = (password, passEncrypt) => {
    return bcrypt.compareSync(password, passEncrypt);
}

module.exports = {
    encrypt,
    compare
}