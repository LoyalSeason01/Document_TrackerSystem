const { getAUserWithRole } = require('../model/rolesModel');


function hasPermission(permissions) {
    return async (req, res, next) => {


        if (!req.user) {
            console.log(req.user)
        }

        const userPermissions = [];

        req.user.role.permissions.forEach(permission => {
            userPermissions.push(permission.permission);
        });
      

        if (!permissions.some(permission => userPermissions.includes(permission))) {
            return res.status(403).json({ error: 'Forbidden' });
        }

        next();
    };
}


module.exports = {
    hasPermission
}