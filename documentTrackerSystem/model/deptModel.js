const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient()

async function getAllDepartment(){
    return prisma.department.findMany()
}

async function createDepartment(){

}

async function updatedDepartment(){

}

async function deleteDepartment(){

}


module.exports = {
    getAllDepartment,
    createDepartment, 
    updatedDepartment,
    deleteDepartment,
}