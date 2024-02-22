const express = require('express');

const { getAllDepartments, createDepartment, 
        updateDepartment, deleteDepartment } = require('../controller/deptController');
const { isAdmin } = require('../middlewares/roles.middleware');
const { protect } = require('../middlewares/auth.middleware');

const deptRouter = express.Router();

const {check} = require('express-validator');


const deptValidation = [
                        check('email').isEmail().withMessage('Invalid Email'),
                        check('deptName').notEmpty().withMessage('Should Not be Empty')
                        ]

deptRouter.get('/department',  protect, isAdmin, getAllDepartments);

deptRouter.post('/department',  deptValidation, protect, isAdmin, createDepartment);

deptRouter.patch('/department', deptValidation, protect, isAdmin, updateDepartment);

deptRouter.delete('/department', deptValidation, protect, isAdmin, isAdmin, deleteDepartment);

module.exports = deptRouter;
