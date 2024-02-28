const userModel = require('../model/userModel');
const {validationResult} = require('express-validator')

async function getUserProfile(req, res){
    const userDetail = req.user
   
    return res.send(userDetail);
}

async function updateUser(req, res){
    try {

        const error = validationResult(req);
    
        if(!error.isEmpty()){
            return res.status(400).json({error : error.array()});
        }else{
        
        //Old UserDetails
        const {email, divisionId, departmentId} = req.user

        //New userDetails
        const { name, newEmail,  division, department, role} = req.body
    
        
        return res.send(await userModel.updateUser(email, newEmail,  name,  divisionId, division, departmentId, department, role ));

        }

    } catch (error) {
        res.send(error);
    }
   
}

async function deleteUser(req, res){
    const {email} = req.user

    const deleteUser = await userModel.deleteUser(email);

    if(deleteUser.error){
        return res.status(404).send(deleteUser)
    }

    return res.status(200).json({msg : 'User Deleted Successfully',
                                 email : deleteUser.email,
                                 name : deleteUser.name
                            });

}



module.exports = {
    getUserProfile, 
    updateUser,
    deleteUser,
}