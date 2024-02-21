const rolesModel = require('../model/rolesModel');

async function getAllStaffRoles(req, res){
    return res.send(await rolesModel.getAllRolesAndUsers)
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
    createRoleForStaff,
    updateRoleForStaff,
    deleteRoleForStaff
}