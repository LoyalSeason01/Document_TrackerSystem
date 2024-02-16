const { PrismaClient } = require('@prisma/client');


const prisma = new PrismaClient()

async function getUser(email){
    try {


        return await prisma.user.findUnique({
            where : {email : email}
        })
               

    } catch (error) {
        return error;
    }
}

async function getUserById(userId){
    try{

        return prisma.user.findUnique({
            where : {userId},
            include : {
                division : true,
                department : true
            }
        })

    }catch (error){

    }
}

async function createUser(name, email, password, divisionName, deptName){

    try {
        const foundEmail = await prisma.user.findMany({
            where : {email : email}
        });

    
    if(foundEmail.length === 0){
       
        const division = await prisma.division.create({
            data: {
              divisionName,
            }
          });
          
          const department = await prisma.department.create({
            data: {
              deptName,
            }
          });

            const newUser = await prisma.user.create({
                data : {
                   name, 
                   email,
                   password,
                   division : {connect : {divisionId : division.divisionId}},
                   department : {connect : {deptId : department.deptId}}
                }
            });

            return {newUser, division, department}

        }else{
            return {error: "Email Already Exist"};
        }     

        } catch (error) {
            return error;
        }

}

async function updateUser(email, newEmail, name,  divisionId, divisionName, deptId, deptName ){
    try {
             // Check if the user exists
             const foundUser = await prisma.user.findUnique({
                where: { email }
            });
    
            if (!foundUser) {
                throw new Error('User not found');
            }
    
            // Update the division
            const updatedDivision = await prisma.division.update({
                where: { divisionId },
                data: { divisionName }
            });
    
            // Update the department
            const updatedDepartment = await prisma.department.update({
                where: { deptId },
                data: { deptName }
            });
    
            // Update the user
            const updatedUser = await prisma.user.update({
                where: { email },
                data: {
                    name,
                    email: newEmail,
                    division: { connect: { divisionId: updatedDivision.divisionId } },
                    department: { connect: { deptId: updatedDepartment.deptId } }
                }
            });
    
            return {updatedUser, updatedDivision, updatedDepartment};
 
        
    } catch (error) {
        return error;
    }
}

async function resetPassword(email, password){
  
    try {
        // Check if the user exists
        const foundUser = await prisma.user.findUnique({
           where: { email }
       });

       if (!foundUser) {
          return {error : 'Forbidden'}
       }
      
       // Update the user Password
     
      return await prisma.user.update({
        where : {email},
        data : {
            password,
        }
      });

   
} catch (error) {
   return error;
}
    
}

async function deleteUser(email){
    try {
        const foundEmail = await prisma.user.findMany({
            where : {email,}
        });

        if(foundEmail.length === 1){
            return prisma.user.delete({
                where : {email : email}
            })
        }else{
            return {error : 'User Not Found'}
        }
    } catch (error) {
        
    }
}

module.exports = {
    getUser,
    getUserById,
    createUser,
    updateUser,
    resetPassword,
    deleteUser,
}