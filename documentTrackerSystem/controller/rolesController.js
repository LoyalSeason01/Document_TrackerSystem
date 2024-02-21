const rolesModel = require('../model/rolesModel');

async function getAllStaffRoles(req, res){
    return res.send(await rolesModel.getAllStaffRoles())
}

async function getAUserWithRole(req, res){
    const staffNumber = req.params.staffNumber;

    // res.send(staffNumber)
    return res.send(await rolesModel.getAUserWithRole(staffNumber));
}

async function createRoleForStaff(req, res){
    const {staffNumber, role} = req.body;
    
    const staffRole = await rolesModel.createRoleForUser(staffNumber, role)

    return res.send(staffRole);
}

async function updateRoleForStaff(req, res){

}

async function deleteRoleForStaff(req, res){
 
}

module.exports = {
    getAllStaffRoles,
    getAUserWithRole,
    createRoleForStaff,
    updateRoleForStaff,
    deleteRoleForStaff
}