const express = require('express');
const { getAllStaffs, createStaffUser, updateStaff, deleteStaff } = require('../controller/staffController');
const { isAdmin } = require('../middlewares/roles.middleware');
const { protect } = require('../middlewares/auth.middleware');

const staffRouter = express.Router();

staffRouter.get('/staff', protect,  getAllStaffs);

staffRouter.post('/staff', protect,  createStaffUser);

staffRouter.patch('/staff', protect,  updateStaff);

staffRouter.delete('/staff', protect,  deleteStaff);


module.exports = staffRouter;
