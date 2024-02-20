const staffModel =  require ('../model/staffModel');
const bCrypt = require('bcrypt')

async function createStaffUser(req, res){
        const {name, email, password, department, division, staffNumber} = req.body;

        const salt = await bCrypt.genSalt();
        const encryptedPassword = await bCrypt.hash(password, salt);

        return res.send(await staffModel.createStaffUser(name, email, encryptedPassword, department, division, staffNumber))
}

async function getAllStaffs(req, res){
    return res.send(await staffModel.getAllStaffs())
}

module.exports = {
    createStaffUser,
    getAllStaffs
}