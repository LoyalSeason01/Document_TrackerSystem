const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient()

async function getAllDepartment(){
    return prisma.department.findMany({
        include : {
            user : true
        }
    })
}

async function createDepartment(deptName) {     
    try {
    return prisma.department.create({
    data: {
        deptName: deptName
    }
});
    } catch (error) {
        // Handle errors appropriately
        console.error('Error creating department:', error);
        throw error; // rethrow the error or handle it as per your application's logic
    }
}


async function updatedDepartment(deptId, deptName){
    return prisma.department.update({
        where : {deptId},
        data : {
            deptName,
        }
    });
}

async function deleteDepartment(deptId){
    return prisma.department.delete({
        where : {deptId}
    })
}


module.exports = {
    getAllDepartment,
    createDepartment, 
    updatedDepartment,
    deleteDepartment,
}