const express = require('express');
const { getAllStaffs, createStaffUser, updateStaff, deleteStaff } = require('../controller/staffController');

const staffRouter = express.Router();

staffRouter.get('/staff', getAllStaffs);

staffRouter.post('/staff', createStaffUser);

staffRouter.patch('/staff', updateStaff);

staffRouter.delete('/staff', deleteStaff);


module.exports = staffRouter;
