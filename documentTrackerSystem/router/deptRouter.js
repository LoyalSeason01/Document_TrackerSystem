const express = require('express');
const {PERMISSIONS}  = require('../utils/role.permissions')

const { getAllDepartments, createDepartment, 
        updateDepartment, deleteDepartment } = require('../controller/deptController');
const { hasPermission } = require('../middlewares/roles.middleware');
const { protect } = require('../middlewares/auth.middleware');

const deptRouter = express.Router();

const {check} = require('express-validator');


const deptValidation = [
                        check('email').isEmail().withMessage('Invalid Email'),
                        check('deptName').notEmpty().withMessage('Should Not be Empty')
                        ]

 
deptRouter.get('/department', protect, hasPermission([PERMISSIONS.READ]), getAllDepartments);

deptRouter.post('/department',  deptValidation, protect, hasPermission([PERMISSIONS.CREATE]), createDepartment);

deptRouter.patch('/department', deptValidation, protect, hasPermission([PERMISSIONS.UPDATE]), updateDepartment);

deptRouter.delete('/department', deptValidation, protect, hasPermission([PERMISSIONS.DELETE]),  deleteDepartment);

module.exports = deptRouter;
