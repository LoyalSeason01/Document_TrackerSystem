const express = require('express')
const {logInUser, signUpUser, refreshedUser, forgotPassword} = require('../controller/authController')
const authRouter = express.Router();

const {check} = require('express-validator');


// Validation of Input from user for  SignUp
const validateSignUp = [check('name').notEmpty().withMessage('Should Not be Empty'),
                        check('email').isEmail().withMessage('Email cannot be Empty or invalid'),
                        check('password').notEmpty().withMessage('Password Cannot Not Be Empty'),
                        check('division').notEmpty().withMessage('Division Cannot Not Be Empty'),
                        check('department').notEmpty().withMessage('Department Cannot Not Be Empty'),
                    ]

// Validation of Input from user for LogIn
const validateLogin = [check('email').isEmail().withMessage('Email cannot be Empty or invalid'),
                        check('password').notEmpty().withMessage('Password Cannot Not Be Empty')
                    ]


// LogIn Endpoint
authRouter.post('/login', validateLogin, logInUser);

// SignUp Endpoint
authRouter.post('/signUp', validateSignUp, signUpUser);

authRouter.post('/forgotPassword', forgotPassword)

authRouter.post('/refresh', refreshedUser)



module.exports = authRouter;