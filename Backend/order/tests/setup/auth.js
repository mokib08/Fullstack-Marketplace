const jwt = require('jsonwebtoken')

function getAuthCookie({userId = '6ad1c295af9d458d722b5eae', extra = {role: "user"}} = {}){
    const secret = process.env.JWT_SECRET || 'test-secret=key';
    const payload = { id: userId, ...extra};
    const token = jwt.sign(payload, secret, {expiresIn: '1h'});
    const cookieName = process.env.JWT_COOKIE_NAME || 'token';
    return [`${cookieName}=${token}`];
}

module.exports = {getAuthCookie}