const {PrismaClient} = require('@prisma/client');
const bCrypt =  require('bcrypt');

const {PERMISSIONS} = require('../utils/role.permissions')

const prisma = new PrismaClient();

const users = [
    {
        "name": "John Doe",
        "email": "johndoe@gmail.com",
        "password": "HiThere",
        "divisionName": "CMC",
        "departmentName": "ISU",
        "role": "User",
        "permissions": [PERMISSIONS.READ]
    },
    {
        "name": "Nathaniel",
        "email": "simplebrookes01@gmail.com",
        "password": "HiThere",
        "divisionName": "CoCoBod",
        "departmentName": "HR",
        "staffNumber": "S12345",
        "role": "Admin",
        "permissions": [PERMISSIONS.READ, PERMISSIONS.CREATE, PERMISSIONS.UPDATE, PERMISSIONS.DELETE]
    },
    {
        "name": "loyalSeason",
        "email": "loyalseason@gmail.com",
        "password": "HiThere",
        "divisionName": "CocoBod",
        "departmentName": "ISU",
        "role": "User",
        "permissions": [PERMISSIONS.READ, PERMISSIONS.UPDATE]
    },
    {
        "name": "Emmanuel Asante",
        "email": "easante658@gmail.com",
        "password": "HiThere",
        "divisionName": "CHED",
        "departmentName": "IT",
        "staffNumber": "S54321",
        "role": "Admin",
        "permissions": [PERMISSIONS.READ, PERMISSIONS.CREATE, PERMISSIONS.UPDATE, PERMISSIONS.DELETE]
    },
    {
        "name": "Alice Smith",
        "email": "alice@gmail.com",
        "password": "HiThere",
        "divisionName": "COCOBOD",
        "departmentName": "HR",
        "staffNumber": "S98765",
        "role": "User",
        "permissions": [PERMISSIONS.READ]
    },
    {
        "name": "Jane Doe",
        "email": "janedoe@gmail.com",
        "password": "JaneDoe123",
        "divisionName": "CMC",
        "departmentName": "Finance",
        "role": "User",
        "permissions": [PERMISSIONS.READ]
    },
    {
        "name": "Bob Johnson",
        "email": "bob@gmail.com",
        "password": "HiThere",
        "divisionName": "CMC",
        "departmentName": "Marketing",
        "role": "User",
        "permissions": [PERMISSIONS.READ]
    },
    {
        "name": "Michael Brown",
        "email": "michael@gmail.com",
        "password": "HiThere",
        "divisionName": "CMC",
        "departmentName": "IT",
        "staffNumber": "S13579",
        "role": "Admin",
        "permissions": [PERMISSIONS.READ, PERMISSIONS.CREATE, PERMISSIONS.DELETE]
    },
    {
        "name": "Sarah Williams",
        "email": "sarah@gmail.com",
        "password": "HiThere",
        "divisionName": "COCOBOD",
        "departmentName": "HR",
        "role": "User",
        "permissions": [PERMISSIONS.READ]
    },
    {
        "name": "David Lee",
        "email": "davidlee@gmail.com",
        "password": "LeeDavid789",
        "divisionName": "COCOBOD",
        "departmentName": "Marketing",
        "staffNumber": "S24680",
        "role": "User",
        "permissions": [PERMISSIONS.READ, PERMISSIONS.CREATE]
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
                    const staff = await prisma.staff.create({
                        data: {
                            user: {
                                create: userCreationData
                            },
                            staffNumber,
                            department: { connect: { departmentId: department.departmentId },
                        
                        }
                        }
                    });

                    if (role) {
                        const createdRole = await prisma.role.create({
                            data: {
                                role,
                                user: { connect: { userId: staff.userId } },                            }
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
