const { PrismaClient } = require('@prisma/client');


const prisma = new PrismaClient();

async function getUser(email){
    try {

        return await prisma.user.findUnique({
            where : {email : email},
        })        

    } catch (error) {
        return { 
            error: {
                message: error.message || "An error occurred",
                name: error.name || "UnknownError"
            } 
        };
    }
}

async function getUserById(userId){
    try{

        
        const user = await prisma.user.findUnique({
            where : {userId},
            select: {
                userId: true,
                name: true,
                email: true,
                role : true,
                division: true,
                department : true,
            }
        });

        if(!user){
            return {error : "User Not Found"}
        }


        const permissions = await prisma.permissions.findMany({
            where : {roleId : user.role.roleId}
        })

        return {
                userId,
                name : user.name,
                email : user.email,
                division : user.division.divisionName,
                department : user.department.departmentName,
                role  : {
                    role: user.role.role,
                    permissions: permissions.map(permissions => permissions.permission)
                },
             }

    }catch (error){
        return { 
            error: {
                message: error.message || "An error occurred",
                name: error.name || "UnknownError"
            } 
        };
    }
}

async function getUserProfile(userId){
    try{

        
        const user = await prisma.user.findUnique({
            where : {userId},
            select: {
                userId: true,
                name: true,
                email: true,
                role : true,
                division: true,
                department : true,
            }
        });

        if(!user){
            return {error : "User Not Found"}
        }

        return {
                name : user.name,
                email : user.email,
                division : user.division.divisionName,
                department : user.department.departmentName,
                role  : user.role.role
             }

    }catch (error){
        return { 
            error: {
                message: error.message || "An error occurred",
                name: error.name || "UnknownError"
            } 
        };
    }
}

async function createUser(name, email, password, divisionName, deptName){

    try {
        const foundEmail = await prisma.user.findUnique({
            where : {email : email}
        });

    
    if(!foundEmail){
       
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
            return { 
                error: {
                    message: error.message || "An error occurred",
                    name: error.name || "UnknownError"
                } 
            };
        }

}

async function updateUser(name, email, division, department, role, userId){
    try {
             const user = await prisma.user.findUnique({
                where: { userId }
            });
    
            if (!user) {
                return {error : "User Not Found"}
            }
          
          

            const updateDepartment = await prisma.department.update({
                where : {departmentId : user.departmentId},
                data : {
                    departmentName : department
                }
            });

            const updateDivision = await prisma.division.update({
                where : {divisionId : user.divisionId},
                data : {
                    divisionName : division
                }
            });

            const updatedRole = await prisma.role.update({
                where : {roleId : user.roleId},
                data : {
                    role
                }
            });

            const updatedUser = await prisma.user.update({
                where : {userId},
                data : {
                    name,
                    email,
                    division : {connect : {divisionId : updateDivision.divisionId}},
                    department : {connect : {departmentId : updateDepartment.departmentId}}
                }
            });
               
            return {name : updatedUser.name,
                    email : updatedUser.email,
                    division : updateDivision.divisionName,
                    department : updateDepartment.departmentName,
                    role       : updatedRole.role
                }

    } catch (error) {
        return { 
            error: {
                message: error.message || "An error occurred",
                name: error.name || "UnknownError"
            } 
        };
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
    return { 
        error: {
            message: error.message || "An error occurred",
            name: error.name || "UnknownError"
        } 
    };
}
    
}

async function deleteUser(email){
    try {
        const foundEmail = await prisma.user.findUnique({
            where : {email,}
        });

        if(!foundEmail){
            return {error : 'User Not Found'}
        }

        

        return await prisma.user.delete({
            where : {email}
        });


    } catch (error) {
        return {error : error.message};
    }
}

module.exports = {
    getUser,
    getUserById,
    getUserProfile,
    createUser,
    updateUser,
    resetPassword,
    deleteUser,
}