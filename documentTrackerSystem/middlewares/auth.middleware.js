const jwt = require('jsonwebtoken');
const userModel = require('../model/userModel');

async function protect(req, res, next) {
    try {
        let token = null;

        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            // Get token from header
            token = req.headers.authorization.split(' ')[1];

            // Verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await userModel.getUserById(decoded.id);

            if(req.user === null){
                return res.status(404).json({error : 'Forbidden'})
            }

            next();
        } else {
            // No token provided
            return res.status(401).json({ error: 'Not Authorized, No Token' });
        }
    } catch (error) {
        console.log(error);
        return res.status(401).json({ error: 'Not Authorized' });
    }

}


async function protectPassword(req, res, next) {
    try {
        let token = null;

        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            // Get token from header
            token = req.headers.authorization.split(' ')[1];

            if(token === req.params.token){
                  // Verify token
            const decoded = jwt.verify(token, process.env.PASSWORD_RESET);
            req.user = await userModel.getUserById(decoded.id);

            if(req.user === null){
                return res.status(404).json({error : 'Forbidden'})
            }

            next();
            } else{
                return res.status(401).json({error : 'Unauthorized'})
            }
          
        } else {
            // No token provided
            return res.status(401).json({ error: 'Not Authorized, No Token' });
        }
    } catch (error) {
        console.log(error);
        return res.status(401).json({ error: 'Not Authorized' });
    }

}

module.exports = {
    protect,
    protectPassword
}