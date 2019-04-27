const jwt = require('jsonwebtoken');

module.exports = function (req, res) {
    const token = req.headers['x-auth-token'];
    if (!token) {
        res.writeHead(403);
        res.end('Access denied: no token provided');
        return false
    }


    try{
        req.user = jwt.verify(token, 'jwtPrivateKey');
        return true;
    }
    catch (exception){
        res.writeHead(403);
        res.end('Access denied: invalid token');
        return false;
    }
}