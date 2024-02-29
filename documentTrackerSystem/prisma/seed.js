const {PrismaClient} = require('@prisma/client');
const bCrypt =  require('bcrypt');

const {PERMISSIONS} = require('../utils/role.permissions');
const { connect } = require('../router/userRouter');

const prisma = new PrismaClient();

const users = [
    {
        "name": "John Doe",
        "email": "johndoe@gmail.com",
        "password": "HiThere",
        "divisionName": "CMC",
        "departmentName": "ISU",
        "role": "User",
        "permissions": [
                        PERMISSIONS.READ_USER, 
                        PERMISSIONS.UPDATE_USER,

                        PERMISSIONS.READ_DEPT,

                        PERMISSIONS.READ_DOCUMENT,
                        PERMISSIONS.CREATE_DOCUMENT,
                        PERMISSIONS.UPDATE_DOCUMENT,
                        PERMISSIONS.DELETE_DOCUMENT,

                        PERMISSIONS.READ_ROLES,

                        PERMISSIONS.READ_STAFF,
                    ]
    },
    {
        "name": "Nathaniel",
        "email": "simplebrookes01@gmail.com",
        "password": "HiThere",
        "divisionName": "CoCoBod",
        "departmentName": "HR",
        "staffNumber": "S12345",
        "role": "Admin",
        "permissions": [
                        PERMISSIONS.READ_USER, 
                        PERMISSIONS.CREATE_USER, 
                        PERMISSIONS.UPDATE_USER,
                        PERMISSIONS.DELETE_USER,

                        PERMISSIONS.READ_DEPT,
                        PERMISSIONS.CREATE_DEPT,
                        PERMISSIONS.UPDATE_DEPT,
                        PERMISSIONS.DELETE_DEPT,

                        PERMISSIONS.READ_DOCUMENT,
                        PERMISSIONS.CREATE_DOCUMENT,
                        PERMISSIONS.UPDATE_DOCUMENT,
                        PERMISSIONS.DELETE_DOCUMENT,

                        PERMISSIONS.READ_ROLES,
                        PERMISSIONS.CREATE_ROLES,
                        PERMISSIONS.UPDATE_ROLES,
                        PERMISSIONS.DELETE_ROLES,

                        PERMISSIONS.READ_STAFF,
                        PERMISSIONS.CREATE_STAFF,
                        PERMISSIONS.UPDATE_STAFF,
                        PERMISSIONS.DELETE_STAFF,
                  ]
    },
    {
        "name": "loyalSeason",
        "email": "loyalseason@gmail.com",
        "password": "HiThere",
        "divisionName": "CocoBod",
        "departmentName": "ISU",
        "role": "User",
        "permissions": [  
                          PERMISSIONS.READ_USER, 
                          PERMISSIONS.UPDATE_USER,

                          PERMISSIONS.READ_DEPT,

                          PERMISSIONS.READ_DOCUMENT,
                          PERMISSIONS.CREATE_DOCUMENT,
                          PERMISSIONS.UPDATE_DOCUMENT,
                          PERMISSIONS.DELETE_DOCUMENT,

                          PERMISSIONS.READ_ROLES,

                          PERMISSIONS.READ_STAFF,
                        ]
    },
    {
        "name": "Emmanuel Asante",
        "email": "easante658@gmail.com",
        "password": "HiThere",
        "divisionName": "CHED",
        "departmentName": "IT",
        "staffNumber": "S54321",
        "role": "Admin",
        "permissions": [
            PERMISSIONS.READ_USER, 
            PERMISSIONS.CREATE_USER, 
            PERMISSIONS.UPDATE_USER,
            PERMISSIONS.DELETE_USER,

            PERMISSIONS.READ_DEPT,
            PERMISSIONS.CREATE_DEPT,
            PERMISSIONS.UPDATE_DEPT,
            PERMISSIONS.DELETE_DEPT,

            PERMISSIONS.READ_DOCUMENT,
            PERMISSIONS.CREATE_DOCUMENT,
            PERMISSIONS.UPDATE_DOCUMENT,
            PERMISSIONS.DELETE_DOCUMENT,

            PERMISSIONS.READ_ROLES,
            PERMISSIONS.CREATE_ROLES,
            PERMISSIONS.UPDATE_ROLES,
            PERMISSIONS.DELETE_ROLES,

            PERMISSIONS.READ_STAFF,
            PERMISSIONS.CREATE_STAFF,
            PERMISSIONS.UPDATE_STAFF,
            PERMISSIONS.DELETE_STAFF,
      ]
    },
    {
        "name": "Alice Smith",
        "email": "alice@gmail.com",
        "password": "HiThere",
        "divisionName": "COCOBOD",
        "departmentName": "HR",
        "staffNumber": "S98765",
        "role": "User",
        "permissions":  [  
                        PERMISSIONS.READ_USER, 
                        PERMISSIONS.UPDATE_USER,

                        PERMISSIONS.READ_DEPT,

                        PERMISSIONS.READ_DOCUMENT,
                        PERMISSIONS.CREATE_DOCUMENT,
                        PERMISSIONS.UPDATE_DOCUMENT,
                        PERMISSIONS.DELETE_DOCUMENT,

                        PERMISSIONS.READ_ROLES,

                        PERMISSIONS.READ_STAFF,
                    ]
    },
    {
        "name": "Jane Doe",
        "email": "janedoe@gmail.com",
        "password": "JaneDoe123",
        "divisionName": "CMC",
        "departmentName": "Finance",
        "role": "User",
        "permissions":  [  
                            PERMISSIONS.READ_USER, 
                            PERMISSIONS.UPDATE_USER,

                            PERMISSIONS.READ_DEPT,

                            PERMISSIONS.READ_DOCUMENT,
                            PERMISSIONS.CREATE_DOCUMENT,
                            PERMISSIONS.UPDATE_DOCUMENT,
                            PERMISSIONS.DELETE_DOCUMENT,

                            PERMISSIONS.READ_ROLES,

                            PERMISSIONS.READ_STAFF,
                        ]
    },
    {
        "name": "Bob Johnson",
        "email": "bob@gmail.com",
        "password": "HiThere",
        "divisionName": "CMC",
        "departmentName": "Marketing",
        "role": "User",
        "permissions":  [  
                            PERMISSIONS.READ_USER, 
                            PERMISSIONS.UPDATE_USER,

                            PERMISSIONS.READ_DEPT,

                            PERMISSIONS.READ_DOCUMENT,
                            PERMISSIONS.CREATE_DOCUMENT,
                            PERMISSIONS.UPDATE_DOCUMENT,
                            PERMISSIONS.DELETE_DOCUMENT,

                            PERMISSIONS.READ_ROLES,

                            PERMISSIONS.READ_STAFF,
                        ]
    },
    {
        "name": "Michael Brown",
        "email": "michael@gmail.com",
        "password": "HiThere",
        "divisionName": "CMC",
        "departmentName": "IT",
        "staffNumber": "S13579",
        "role": "Admin",
        "permissions":  [
                            PERMISSIONS.READ_USER, 
                            PERMISSIONS.CREATE_USER, 
                            PERMISSIONS.UPDATE_USER,
                            PERMISSIONS.DELETE_USER,

                            PERMISSIONS.READ_DEPT,
                            PERMISSIONS.CREATE_DEPT,
                            PERMISSIONS.UPDATE_DEPT,
                            PERMISSIONS.DELETE_DEPT,

                            PERMISSIONS.READ_DOCUMENT,
                            PERMISSIONS.CREATE_DOCUMENT,
                            PERMISSIONS.UPDATE_DOCUMENT,
                            PERMISSIONS.DELETE_DOCUMENT,

                            PERMISSIONS.READ_ROLES,
                            PERMISSIONS.CREATE_ROLES,
                            PERMISSIONS.UPDATE_ROLES,
                            PERMISSIONS.DELETE_ROLES,

                            PERMISSIONS.READ_STAFF,
                            PERMISSIONS.CREATE_STAFF,
                            PERMISSIONS.UPDATE_STAFF,
                            PERMISSIONS.DELETE_STAFF,
                        ]
    },
    {
        "name": "Sarah Williams",
        "email": "sarah@gmail.com",
        "password": "HiThere",
        "divisionName": "COCOBOD",
        "departmentName": "HR",
        "role": "User",
        "permissions":  [  
                            PERMISSIONS.READ_USER, 
                            PERMISSIONS.UPDATE_USER,

                            PERMISSIONS.READ_DEPT,

                            PERMISSIONS.READ_DOCUMENT,
                            PERMISSIONS.CREATE_DOCUMENT,
                            PERMISSIONS.UPDATE_DOCUMENT,
                            PERMISSIONS.DELETE_DOCUMENT,

                            PERMISSIONS.READ_ROLES,

                            PERMISSIONS.READ_STAFF,
                    ]
    },
    {
        "name": "David Lee",
        "email": "davidlee@gmail.com",
        "password": "LeeDavid789",
        "divisionName": "COCOBOD",
        "departmentName": "Marketing",
        "staffNumber": "S24680",
        "role": "User",
        "permissions":  [  
                            PERMISSIONS.READ_USER, 
                            PERMISSIONS.UPDATE_USER,

                            PERMISSIONS.READ_DEPT,

                            PERMISSIONS.READ_DOCUMENT,
                            PERMISSIONS.CREATE_DOCUMENT,
                            PERMISSIONS.UPDATE_DOCUMENT,
                            PERMISSIONS.DELETE_DOCUMENT,

                            PERMISSIONS.READ_ROLES,

                            PERMISSIONS.READ_STAFF,
                    ]
    }
];


async function seedDatabase() {
    try {
        for (const userData of users) {
            const { name, email, password, divisionName, departmentName, staffNumber, role, permissions } = userData;

            const salt = await bCrypt.genSalt();
            const encryptedPassword = await bCrypt.hash(password, salt);

            const foundEmail = await prisma.user.findUnique({
                where: { email }
            });

            if (!foundEmail) {
                const division = await prisma.division.create({
                    data: {
                        divisionName
                    }
                });

                const department = await prisma.department.create({
                    data: {
                        departmentName,
                        division : {connect : {divisionId : division.divisionId}}
                    }
                });

                const userCreationData = {
                    name,
                    email,
                    password: encryptedPassword,
                    department: { connect: { departmentId: department.departmentId }  },
                    division : {connect : {divisionId : division.divisionId}}
                };

                if (staffNumber) {

                    const user =  await prisma.user.create({
                        data: userCreationData
                    });

                    const staff = await prisma.staff.create({
                        data: {
                            user : {connect : {userId : user.userId}},
                            staffNumber,
                            department: { connect: { departmentId: department.departmentId },
                        
                        }
                        }
                    });


                    if (role) {
                        const createdRole = await prisma.role.create({
                            data: {
                                role,
                                user: { connect: { userId: user.userId } },                            }
                        });

                        const permissionsData = permissions.map(permission => ({
                            permission,
                            roleId: createdRole.roleId
                        }));
                    
                          await prisma.permissions.createMany({
                            data: permissionsData
                        });
                    }
                } else {
                  const user =  await prisma.user.create({
                        data: userCreationData
                    });


                    if (role) {
                        const createdRole = await prisma.role.create({
                            data: {
                                role,
                                user : {connect : {userId : user.userId}}
                            }
                        })
                        const permissionsData = permissions.map(permission => ({
                            permission,
                            roleId: createdRole.roleId
                        }));
                    
                          await prisma.permissions.createMany({
                            data: permissionsData
                        });
                    }
                }
            } else {
                console.log(`User with email ${email} already exists.`);
            }
        }
    } catch (error) {
        console.error('Error seeding database:', error);
    } finally {
        await prisma.$disconnect();
    }
}

seedDatabase();
