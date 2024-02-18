const express = require('express');
const { getAllDepartments, createDepartment, 
        updateDepartment, deleteDepartment } = require('../controller/deptController');

const deptRouter = express.Router();

deptRouter.get('/department', getAllDepartments);

deptRouter.post('/department', createDepartment);

deptRouter.patch('/department', updateDepartment);

deptRouter.delete('/department', deleteDepartment);


module.exports = deptRouter;
