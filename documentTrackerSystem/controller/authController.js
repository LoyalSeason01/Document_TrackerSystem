const userModel = require('../model/userModel');
const bCrypt = require('bcrypt')
const {validationResult} = require('express-validator')
const jwt = require('jsonwebtoken');


async function logInUser(req, res){

    const {email, password} = req.body;
   
     const error = validationResult(req);
    
    if(!error.isEmpty()){
        return res.status(400).json({error : error.array()});
    }else{
    const user = await userModel.getUser(email);
    
    if(user){
        const auth = await bCrypt.compare(password, user.password);
    
        if(auth){
            res.cookie('refreshToken', refreshToken(user.userId), {httpOnly: true, sameSite : 'strict'});
            res.cookie('token', generateToken(user.userId), {httpOnly: true, sameSite : 'strict'});
          return res.status(200).json({
            token : generateToken(user.userId),
          });
        }else{
            return res.status(401).json({error : "Incorrect Password"})
          }
    }else{
        return res.status(400).json({error : 'Incorrect or Email Not Found'})
      }  

    }
}

async function signUpUser(req, res){

    try{
        const {name, email, password, division, department} = req.body
   
        const error = validationResult(req);
    
        if(!error.isEmpty()){
            return res.status(400).json({error : error.array()});
        }else{
            const salt = await bCrypt.genSalt();
            const encryptedPassword = await bCrypt.hash(password, salt);
            
            const newUser = await userModel.createUser(name, email, encryptedPassword, division, department);
        
            if(newUser.error){
                return res.send(newUser)
            }

            const userId = newUser.newUser.userId
            res.cookie('refreshToken', refreshToken(userId), {httpOnly: true, sameSite : 'strict'});
            res.cookie('token', generateToken(userId), {httpOnly: true, sameSite : 'strict'});

            return res.json({
                status :'SignUp Successful',
                 token : generateToken(userId), });
        }
    } catch(error){
        return res.send(error);
    }
   
}


async function forgotPassword(req, res){
  const {email} = req.body;

  const user = await userModel.getUser(email);

  if(!user){
    return res.status(404).json({error : 'Forbidden'});
  }

  const accessToken = generateResetToken(user.userId)
  const resetToken = "/resetPassword/"+accessToken
  return res.status(200).send(resetToken)
}


async function resetPassword(req, res){
        const { email }= req.user
        const {password, confirmPassword} = req.body
        
        const error = validationResult(req);

        if(!error.isEmpty()){
           return res.status(400).json({error : error.array()});
        }else{
          if(password === confirmPassword){
         
            const salt = await bCrypt.genSalt();
            const encryptedPassword = await bCrypt.hash(password, salt)

            const passwordChange = await userModel.resetPassword(email, encryptedPassword);
            return res.status(200).json({passwordChange});

          }else{
            return res.json({error : 'Check Your Password'})
          }
        }

      
}

async function refreshedUser(req, res){
  const refreshToken = req.cookies['refreshToken'];
  
  if(!refreshToken){
    return res.status(401).send('Access Denied. No refresh token provided.');
  }
  
  try {
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN);
    const accessToken = generateToken(decoded.id)
    res
      .header('Authorization', accessToken)
      .send(accessToken);
  } catch (error) {
    return res.status(400).send('Invalid refresh token.');
  }
}

//Function to Generate token
function generateToken(id){
    return jwt.sign({id}, process.env.JWT_SECRET, {
      expiresIn: '12h',
    });
  } 
  
//   Function to Generate RefreshTokens
  function refreshToken(id){
      return jwt.sign({id}, process.env.REFRESH_TOKEN, {expiresIn : '1d'});
  }

// Function to Generate passwordResetToken
function generateResetToken(id){
  return jwt.sign({id}, process.env.PASSWORD_RESET, {
    expiresIn: '5m',
  });
}


module.exports = {
    logInUser,
    signUpUser,
    forgotPassword,
    resetPassword,
    refreshedUser,
}