const rolesModel = require('../model/rolesModel');

async function getAllStaffRoles(req, res){
    return res.send(await rolesModel.getAllStaffRoles())
}

async function getAUserWithRole(req, res){
    const staffNumber = req.params.staffNumber;
    return res.send(await rolesModel.getAUserWithRole(staffNumber));
}

async function createRoleForStaff(req, res){

    try {
        const {staffNumber, role} = req.body;
    
        const staffRole = await rolesModel.createRoleForUser(staffNumber, role)
    
        return res.status(201).send(staffRole);
    } catch (error) {
        return error;
    }

}

async function updateStaffRole(req, res){
        res.send('Update')
}

async function deleteStaffRole(req, res){
    res.send(req.body)
}

module.exports = {
    getAllStaffRoles,
    getAUserWithRole,
    createRoleForStaff,
    updateStaffRole,
    deleteStaffRole,
}