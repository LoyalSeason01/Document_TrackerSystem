const staffModel =  require ('../model/staffModel');
const bCrypt = require('bcrypt');

async function getAllStaffs(req, res){
    return res.send(await staffModel.getAllStaffs())
}
 

async function createStaffUser(req, res){
        const {name, email, password,  division, department, staffNumber} = req.body;

        const salt = await bCrypt.genSalt();
        const encryptedPassword = await bCrypt.hash(password, salt);

        return res.send(await staffModel.createStaffUser(name, email, encryptedPassword, division, department, staffNumber))
}

async function updateStaff(req, res){
    const {staffNumber, newStaffNumber} = req.body;
    return res.send(await staffModel.updateStaffData(staffNumber, newStaffNumber))
}


async function deleteStaff(req, res){
    const {staffNumber} = req.body;
    return res.send(await staffModel.deleteStaff(staffNumber));
}

module.exports = {
    createStaffUser,
    getAllStaffs,
    updateStaff,
    deleteStaff,
}