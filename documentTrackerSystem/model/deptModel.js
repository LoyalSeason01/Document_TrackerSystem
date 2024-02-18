const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient()

async function getAllDepartment(){
    return prisma.department.findMany({
        include : {
            user : true
        }
    })
}

async function createDepartment(deptName){
    return prisma.department.create({
        data : {
            deptName,
        }
    })
}

async function updatedDepartment(){
    return prisma.department.create({
        data : {
            deptName,
        }
    })
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