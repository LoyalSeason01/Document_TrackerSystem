const express = require('express')
const {logInUser, signUpUser, refreshedUser, forgotPassword, resetPassword} = require('../controller/authController')
const authRouter = express.Router();

const {check} = require('express-validator');
const {protectPassword }= require('../middlewares/auth.middleware');


const {createStaffUser} = require('../controller/staffController')

// Validation of Input from user for  SignUp
const validateSignUp = [check('name').notEmpty().withMessage('Name cannot not be Empty'),
                        check('email').isEmail().withMessage('Invalid Email'),
                        check('password').notEmpty().withMessage('Password Cannot Not Be Empty'),
                        check('division').notEmpty().withMessage('Division Cannot Not Be Empty'),
                        check('department').notEmpty().withMessage('Department Cannot Not Be Empty'),
                    ]

// Validation of Input from user for LogIn
const validateLogin = [check('email').isEmail().withMessage('Invalid Email'),
                        check('password').notEmpty().withMessage('Password Cannot Not Be Empty')
                    ]

const validatePassword = [check('password').notEmpty().withMessage('Password Cannot Not Be Empty'),
                          check('confirmPassword').notEmpty().withMessage('Password Cannot Not Be Empty')
                    ]

// LogIn Endpoint
authRouter.post('/login', validateLogin, logInUser);

// SignUp Endpoint
authRouter.post('/signUp', validateSignUp, signUpUser);

authRouter.post('/forgotPassword', forgotPassword)

authRouter.post('/resetPassword/:token', protectPassword,  validatePassword, resetPassword)

authRouter.post('/refresh', refreshedUser)



// Staff EndPoints
authRouter.post('/staffSignUp', createStaffUser)





module.exports = authRouter;