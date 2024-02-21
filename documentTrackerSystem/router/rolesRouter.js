const express = require('express');
const { isAdmin } = require('../middlewares/roles.middleware');
const { protect } = require('../middlewares/auth.middleware');
const { getAllStaffRoles, createRoleForStaff, getAUserWithRole } = require('../controller/rolesController');
 
const roleRouter = express.Router();

roleRouter.get('/role',  getAllStaffRoles);
roleRouter.get('/role/:staffNumber',  getAUserWithRole);

roleRouter.post('/role',  createRoleForStaff);

// roleRouter.patch('/staff', protect, isAdmin, updateStaff);

// roleRouter.delete('/staff', protect, isAdmin, deleteStaff);


module.exports = roleRouter;
