const deptModel = require('../model/deptModel');
const {validationResult} = require('express-validator')

async function getAllDepartments(req, res){
    return res.status(200).send(await deptModel.getAllDepartment())
}

async function createDepartment(req, res){
    try {
        const error = validationResult(req);

        if(!error.isEmpty()){
            return res.status(400).json({error : error.array()});
        }else{
             const {email, deptName }= req.body;
             return res.status(200).send(await deptModel.createDepartment(deptName));
        }
    } catch (error) {
       return error; 
    }
}

async function updateDepartment(req, res){
    const error = validationResult(req);
        
    if(!error.isEmpty()){
        return res.status(400).json({error : error.array()});
    }else{
        const {deptName, email }= req.body;
        return res.status(200).send(await deptModel.updatedDepartment(email, deptName))
    }
}

async function deleteDepartment(req, res){
    const { userId } = req.user.user;
    console.log(userId)

    
    const user  = await deptModel.deleteDepartment(userId);

    if(user.error){
        return res.status(404).send(user)
    }

    return res.status(200).send(user);
}


module.exports = {
    getAllDepartments,
    createDepartment,
    updateDepartment,
    deleteDepartment,
}