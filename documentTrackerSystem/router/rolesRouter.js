const express = require('express');
const { hasPermission } = require('../middlewares/roles.middleware');
const { protect } = require('../middlewares/auth.middleware');
const { getAllStaffRoles, createRoleForStaff, 
        getAUserWithRole, updateStaffRole, deleteStaffRole } = require('../controller/rolesController');
const { PERMISSIONS } = require('../utils/role.permissions');
 
const roleRouter = express.Router();

roleRouter.get('/role',  protect, hasPermission([PERMISSIONS.READ]), getAllStaffRoles);
roleRouter.get('/role/:staffNumber', protect,  getAUserWithRole);

roleRouter.post('/role',  protect, hasPermission([PERMISSIONS.CREATE]),  createRoleForStaff);

roleRouter.patch('/role', protect, hasPermission([PERMISSIONS.UPDATE]), updateStaffRole);

roleRouter.delete('/role', protect, hasPermission([PERMISSIONS.UPDATE]), deleteStaffRole);


module.exports = roleRouter;
