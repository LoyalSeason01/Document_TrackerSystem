const deptModel = require('../model/deptModel');

async function getAllDepartments(req, res){
    return res.send(await deptModel.getAllDepartment())
}

async function createDepartment(){

}

async function updateDepartment(){

}

async function deleteDepartment(){

}


module.exports = {
    getAllDepartments,
    createDepartment,
    updateDepartment,
    deleteDepartment,
}