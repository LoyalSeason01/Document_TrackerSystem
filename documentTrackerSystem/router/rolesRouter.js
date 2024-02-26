const express = require('express');
const { isAdmin } = require('../middlewares/roles.middleware');
const { protect } = require('../middlewares/auth.middleware');
const { getAllStaffRoles, createRoleForStaff, 
        getAUserWithRole, updateStaffRole, deleteStaffRole } = require('../controller/rolesController');
 
const roleRouter = express.Router();

roleRouter.get('/role',  protect, getAllStaffRoles);
roleRouter.get('/role/:staffNumber', protect,  getAUserWithRole);

roleRouter.post('/role',  protect,  createRoleForStaff);

roleRouter.patch('/role', protect,  updateStaffRole);

roleRouter.delete('/role', protect, deleteStaffRole);


module.exports = roleRouter;
