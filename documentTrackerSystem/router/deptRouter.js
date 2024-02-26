const express = require('express');

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

const ROLE = {
        ADMIN : 'Admin',
        BASIC : 'Basic'
}

deptRouter.get('/department', protect, hasPermission([ROLE.ADMIN, ROLE.BASIC]), getAllDepartments);
deptRouter.post('/department',  deptValidation, protect, hasPermission([ROLE.ADMIN]),  createDepartment);

deptRouter.patch('/department', deptValidation, protect,  updateDepartment);

deptRouter.delete('/department', deptValidation, protect,   deleteDepartment);

module.exports = deptRouter;
