const express = require('express');
const {  updateUser, deleteUser, getUserProfile } = require('../controller/userController');
const {protect} = require('../middlewares/auth.middleware');

const userRouter = express.Router();

const {check} = require('express-validator');

const updateValidation = [check('name').notEmpty().withMessage('Should Not be Empty'),
                        check('newEmail').isEmail().withMessage('Email cannot be Empty or invalid'),
                        check('division').notEmpty().withMessage('Division Cannot Not Be Empty'),
                        check('department').notEmpty().withMessage('Department Cannot Not Be Empty'),
                    ]


userRouter.get('/user', protect, getUserProfile);

userRouter.patch('/user',  protect, updateValidation, updateUser);

userRouter.delete('/user', protect, deleteUser)



module.exports = userRouter;

