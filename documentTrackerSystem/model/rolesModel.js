const {PrismaClient} = require('@prisma/client');

const prisma = new PrismaClient();

async function getAllStaffRoles(){
    try {
        const user= prisma.role.findMany({
            include : {
                staff : true,
            }
        });

        return user
    } catch (error) {
        return error
    }
    
};

async function getAUserWithRole(staffNumber){
   try {
    const staff = await prisma.staff.findUnique({
        where : {staffNumber},
        include : {
            role : true
        }
    });

    if(!staff) {
        return {error : "User Cannot Be found"};
    }

    return staff;
    
   } catch (error) {
    return error;
   }
   
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
    getAllStaffRoles,
    getAUserWithRole,
    createRoleForUser,
    updateRoleOfUser,
    deleteRoleOfUser,
}