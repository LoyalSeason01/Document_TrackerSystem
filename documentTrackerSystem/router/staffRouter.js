const express = require('express');
const { getAllStaffs, createStaffUser, updateStaff, deleteStaff } = require('../controller/staffController');
const {  hasPermission } = require('../middlewares/roles.middleware');
const { protect } = require('../middlewares/auth.middleware');
const { PERMISSIONS } = require('../utils/role.permissions');

const staffRouter = express.Router();

staffRouter.get('/staff', protect, hasPermission([PERMISSIONS.READ_STAFF]),  getAllStaffs);

staffRouter.post('/staff', protect,  hasPermission([PERMISSIONS.CREATE_STAFF]), createStaffUser);

staffRouter.patch('/staff', protect, hasPermission([PERMISSIONS.UPDATE_STAFF]),  updateStaff);

staffRouter.delete('/staff', protect, hasPermission([PERMISSIONS.DELETE_STAFF]),  deleteStaff);


module.exports = staffRouter;
