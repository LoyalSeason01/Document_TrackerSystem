const deptModel = require('../model/deptModel');

async function getAllDepartments(req, res){
    return res.status(200).send(await deptModel.getAllDepartment())
}

async function createDepartment(){
    const deptName = req.body;
    return res.status(200).send(await deptModel.createDepartment(deptName))
}

async function updateDepartment(){
    const updatedDeptName = req.body;
    return res.status(200).send(await deptModel.updatedDepartment(updatedDeptName))
}

async function deleteDepartment(){
    const deptId =  req.body;
    return res.status(200).send(await deptModel.deleteDepartment(deptId))
}


module.exports = {
    getAllDepartments,
    createDepartment,
    updateDepartment,
    deleteDepartment,
}