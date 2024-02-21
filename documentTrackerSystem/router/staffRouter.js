const express = require('express');
const { getAllStaffs, createStaffUser, updateStaff, deleteStaff } = require('../controller/staffController');
const { isAdmin } = require('../middlewares/roles.middleware');
const { protect } = require('../middlewares/auth.middleware');

const staffRouter = express.Router();

staffRouter.get('/staff', protect,  getAllStaffs);

staffRouter.post('/staff', protect, isAdmin, createStaffUser);

staffRouter.patch('/staff', protect, isAdmin, updateStaff);

staffRouter.delete('/staff', protect, isAdmin, deleteStaff);


module.exports = staffRouter;
