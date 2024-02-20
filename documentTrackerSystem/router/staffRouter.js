const express = require('express');
const { getAllStaffs } = require('../controller/staffController');

const staffRouter = express.Router();

staffRouter.get('/staff', getAllStaffs);

// staffRouter.post('/staff', createDepartment);

// staffRouter.patch('/staff', updateDepartment);

// staffRouter.delete('/staff', deleteDepartment);


module.exports = staffRouter;
