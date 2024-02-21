const {PrismaClient} = require('@prisma/client');

const prisma = new PrismaClient();

async function getAllRolesAndUsers(){
    return  {msg : 'Got all Users and Their Roles'}
}

async function getAUserWithRole(staffNumber){
   
    const staff = await prisma.staff.findUnique({
        where : {staffNumber}
    });

    if(!staff) {
        return {error : "User Cannot Be found"};
    }

    return await prisma.role.findUnique({
        where : {staffId : staff.staffId}
    });

}


async function createRoleForUser(staffNumber, role){
    try {
        const staff = await prisma.staff.findUnique({
            where: { staffNumber }
        });
        
        if (!staff) {
            return { error: 'User Not Found' };
        }

        const createdRole = await prisma.role.create({
            data: {
                role,
                staff: { connect: { staffId: staff.staffId } }
            }
        });

        return createdRole; 
    } catch (error) {

        if (error.code === 'P2014') {
            return { error: 'Failed to create role' };
        }
        return { error: 'An unexpected error occurred' };
    }
}


async function updateRoleOfUser(staffNumber){
   
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