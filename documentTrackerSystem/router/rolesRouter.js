const express = require('express');
const { isAdmin } = require('../middlewares/roles.middleware');
const { protect } = require('../middlewares/auth.middleware');
const { getAllStaffRoles, createRoleForStaff, 
        getAUserWithRole, updateStaffRole, deleteStaffRole } = require('../controller/rolesController');
 
const roleRouter = express.Router();

roleRouter.get('/role',  protect, getAllStaffRoles);
roleRouter.get('/role/:staffNumber', protect, isAdmin, getAUserWithRole);

roleRouter.post('/role',  protect, isAdmin, createRoleForStaff);

roleRouter.patch('/role', protect, isAdmin, updateStaffRole);

roleRouter.delete('/role', protect, deleteStaffRole);


module.exports = roleRouter;
