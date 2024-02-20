const deptModel = require('../model/deptModel');

async function getAllDepartments(req, res){
    return res.status(200).send(await deptModel.getAllDepartment())
}

async function createDepartment(req, res){
    const { deptName }= req.body;
    return res.status(200).send(await deptModel.createDepartment(deptName));
}

async function updateDepartment(req, res){
    const {deptName }= req.body;
    deptId = Number(req.body.deptId)
    return res.status(200).send(await deptModel.updatedDepartment(deptId, deptName))
}

async function deleteDepartment(req, res){
    const  deptId  = Number(req.body.deptId);
    
    const user  = await deptModel.deleteDepartment(deptId);

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