const userModel = require('../model/userModel');
const {validationResult} = require('express-validator')

async function getUserProfile(req, res){
    const {userId} = req.user

    const userDetails = await userModel.getUserProfile(userId)
    return res.status(200).json(userDetails);

}

async function updateUser(req, res){
    try {

        const error = validationResult(req);
       
        if(!error.isEmpty()){
            return res.status(400).json({error : error.array()});
        }else{
         
      
        // //Old UserDetails
        const {userId} = req.user
            
        // //New userDetails
        const { name, email,  division, department, role} = req.body

        const updateUser = await userModel.updateUser(name, email, division, department, role , userId)
    
        return res.status(200).json({updateUser});

        }

    } catch (error) {
        res.send(error);
    }
   
}

async function deleteUser(req, res){
    const { email } = req.user;

    const deletedUser = await userModel.deleteUser(email);

    if (deletedUser.error) {
        return res.status(404).json(deletedUser);
    }

    return res.status(200).json({
        msg: 'User Deleted Successfully',
        email: deletedUser.email,
        name: deletedUser.name
    });
}




module.exports = {
    getUserProfile, 
    updateUser,
    deleteUser,
}