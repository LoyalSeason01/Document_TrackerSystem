const {PrismaClient} = require('@prisma/client');

const prisma = new PrismaClient();

async function getAllRolesAndUsers(){
    return  {msg : 'Got all Users and Their Roles'}
}

async function getAUserWithRole(staffNumber){
   
    const staff = await prisma.staff.findUnique({
        where : {staffNumber}
    });

    if(!found) {
        return {error : "User Cannot Be found"};
    }

    return await prisma.role.findUnique({
        where : {staffId : staff.staffId}
    });

}


async function createRoleForUser(){
    return await prisma.staff.update({
        where : {staffNumber},
        data : {
            role,
        }
    })
}

async function updateRoleOfUser(){
    return {msg : 'Updated Role of User'}
}

async function deleteRoleOfUser(){
    return {msg : 'Deleted Role of User'}
}

module.exports = {
    getAllRolesAndUsers,
    getAUserWithRole,
    createRoleForUser,
    updateRoleOfUser,
    deleteRoleOfUser,
}