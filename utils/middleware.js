import jsonWebToken from 'jsonwebtoken';
import BLToken from '../schema/blacklistedToken.js';

const MiddlewareAuth = async function (req, res, next) {
    const token = req.header('Authorization')?.split(' ')[1];

    if (!token) {
        return res.status(401).json({error: 'Access Denied. No token provided'});
    }

    try {
        const blTokenModel = await BLToken();
        const isBlackListed =  await blTokenModel.findOne({ token })
        if (isBlackListed) return res.status(403).json({ message : 'Invalid Token'});

        const decoded = jsonWebToken.verify(token, 'token');
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(400).json({error : error+'Invalid Token'});
    }
};

const MiddlewareAuthRef = function (req, res, next) {
    const token = req.header('Authorization')?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'Access Denied. No tken provided'});
    }

    try {
        const decoded = jsonWebToken.verify(token, 'refToken');
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(400).json({ error: error + 'Invalid Token'});
    }
};

export default {
    Auth : MiddlewareAuth,
    AuthRef: MiddlewareAuthRef
}