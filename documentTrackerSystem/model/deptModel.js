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
    try {
        return prisma.department.update({
            where : {deptId},
            data : {
                deptName,
            }
        });
    } catch (error) {
        console.log(error)
    }
}

async function deleteDepartment(deptId){

    try {
        const found = await prisma.department.findUnique({
            where : {deptId}
        });

        if(found){
            try {
                return prisma.department.delete({
                    where : {deptId}
                });
            } catch (error) {
                return error;
            }
        }else{
            return {error : 'User Does Not Exist'}
        }  
    } catch (error) {
        return error;
    }
    
}


module.exports = {
    getAllDepartment,
    createDepartment, 
    updatedDepartment,
    deleteDepartment,
}