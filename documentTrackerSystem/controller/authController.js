const userModel = require('../model/userModel');
const bCrypt = require('bcrypt');
const nodeMailer = require('nodemailer');
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
            return res.status(401).json({error : "Invalid Credential"})
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
                return r8es.send(newUser)
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
    return res.status(404).json({error : 'User Not Found'});
  }
 
  const sendEmail  = await sendResetLink(user.userId, email)
  
  if(sendEmail.error){
    return res.status(500).json(sendEmail);
  }

  return res.send(sendEmail)
  
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

  try {
  
  if(!refreshToken){
    return res.status(401).send('Access Denied. No refresh token provided.');
  }

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

//Function to send a Reset Email Message 
async function sendResetLink(id, email){

  const accessToken = generateResetToken(id);
  const resetUrl = `http://localhost:5000/resetPassword/${accessToken}`

  const transporter = nodeMailer.createTransport({
    host : process.env.MAILER_HOST,
    port : process.env.MAILER_PORT,
    secure : false,
    auth : {
      user : process.env.MAILER_USER,
      pass : process.env.MAILER_PASSWORD,
    }
  });

  try {
    await transporter.sendMail({
        from: process.env.MAILER_FROM_ADDRESS,
        to: email,
        subject: "Password Reset Link",
        text: "Link",
        html: `
        <p>Click the following link to reset your password:</p>
        <a href="${resetUrl}">Reset Password</a>
        <br />
        <p>Alternatively, you can click the button below:</p>
        <a href="${resetUrl}">
          <button style="background-color: #4CAF50; color: white; padding: 10px 20px; border: none; border-radius: 5px; cursor: pointer;">Reset Password</button>
        </a>
      `,
    });

    return {msg : 'Check Your Email For Verification'};
} catch (error) {
    if(error.errno === -4077){
      return {error : "Error occurred while sending email ",}
    }
    return {error: 'Failed to send email' };
}

}

module.exports = {
    logInUser,
    signUpUser,
    forgotPassword,
    resetPassword,
    refreshedUser,
}