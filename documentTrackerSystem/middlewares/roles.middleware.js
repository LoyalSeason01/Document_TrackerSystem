const { getAUserWithRole } = require('../model/rolesModel');


function hasPermission(permissions) {
    return async (req, res, next) => {


        if (!req.user) {
            console.log(req.user)
        }

        const userPermissions = [];
        req.user.permissions.forEach(permission => {
            userPermissions.push(permission.permission);
        });
      

        if (!permissions.some(permission => userPermissions.includes(permission))) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        next();
    };
}


module.exports = {
    hasPermission
}