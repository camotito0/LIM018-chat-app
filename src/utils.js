/* eslint-disable */
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const encrypt = (password) => {
    return bcrypt.hashSync(password, 10)
}

const compare = (password, passEncrypt) => {
    return bcrypt.compareSync(password, passEncrypt);
}

const generateToken = (user) => {
    return jwt.sign(user, 'shhhh', { expiresIn: '8h' })
}

const authenticationToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    jwt.verify(token, 'shhhh', (err, user) => {
        if(err) return res.status(403).send({message:'Access denied, token expired or incorrect'})
        req.user = user
        next();
    })
}

module.exports = {
    encrypt,
    compare,
    generateToken,
    authenticationToken
}