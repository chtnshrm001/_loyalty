import jsonWebToken from 'jsonwebtoken';

const MiddlewareAuth = function (req, res, next) {
    const token = req.header('Authorization')?.split(' ')[1];

    if (!token) {
        return res.status(401).json({error: 'Access Denied. No token provided'});
    }

    try {
        const decoded = jsonWebToken.verify(token, 'token');
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(400).json({error : error+'Invalid Token'});
    }
};

export default {
    Auth : MiddlewareAuth
}