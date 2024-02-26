const {PrismaClient} = require('@prisma/client');
const bCrypt =  require('bcrypt');

const prisma = new PrismaClient();


const user = [
    {
        "name": "John Doe",
        "email": "johndoe@example.com",
        "password": "HiThere",
        "divisionName": "CMC",
        "deptName": "ISU",
    },
    {
        "name": "Nathaniel",
        "email": "simplebrookes01@gmail.com",
        "password": "HiThere",
        "divisionName": "CoCoBod",
        "deptName": "HR",
        "staffNumber": "S12345",
        "role": "Admin"
    },
    {
        "name": "loyalSeason",
        "email": "loyalseason@gmail.com",
        "password": "HiThere",
        "divisionName": "CocoBod",
        "deptName": "ISU"
    },
    {
        "name": "Emmanuel Asante",
        "email": "easante658@gmail.com",
        "password": "HiThere",
        "divisionName": "CHED",
        "deptName": "IT",
        "staffNumber": "S54321",
        "role": "Admin"
    },
    {
        "name": "Alice Smith",
        "email": "alice@example.com",
        "password": "HiThere",
        "divisionName": "COCOBOD",
        "deptName": "HR",
        "staffNumber": "S98765",
        "role": "Basic"
    },
    {
        "name": "Jane Doe",
        "email": "janedoe@example.com",
        "password": "JaneDoe123",
        "divisionName": "CMC",
        "deptName": "Finance"
    },
    {
        "name": "Bob Johnson",
        "email": "bob@example.com",
        "password": "HiThere",
        "divisionName": "CMC",
        "deptName": "Marketing"
    },
    {
        "name": "Michael Brown",
        "email": "michael@example.com",
        "password": "HiThere",
        "divisionName": "CMC",
        "deptName": "IT",
        "staffNumber": "S13579",
        "role": "Admin"
    },
    {
        "name": "Sarah Williams",
        "email": "sarah@example.com",
        "password": "HiThere",
        "divisionName": "COCOBOD",
        "deptName": "HR"
    },
    {
        "name": "David Lee",
        "email": "davidlee@example.com",
        "password": "LeeDavid789",
        "divisionName": "COCOBOD",
        "deptName": "Marketing",
        "staffNumber": "S24680",
        "role": "Basic"
    }
];


async function seedDatabase() {
    try {
        for (const userData of user) {
            const { name, email, password, divisionName, deptName, staffNumber, role } = userData;
           
           
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
                        deptName
                    }
                });

                let userCreationData = {
                    name,
                    email,
                    password :  encryptedPassword,
                    division: { connect: { divisionId: division.divisionId } },
                    department: { connect: { deptId: department.deptId } }
                };

                if (staffNumber) {
                    // Create the staff member
                    const staff = await prisma.staff.create({
                        data: {
                            user: {
                                create: userCreationData
                            },
                            staffNumber,
                            department: { connect: { deptId: department.deptId } }
                        }
                    });

                    if (role) {
                        // Create the role
                        const createdRole = await prisma.role.create({
                            data: {
                                role: role,
                                staff: {
                                    connect: {
                                        staffId: staff.staffId
                                    }
                                }
                            }
                        });

                        // Assign the created role to the staff member
                        userCreationData.role = {
                            connect: {
                                roleId: createdRole.roleId
                            }
                        };
                    }
                } else {
                    // Create a regular user
                    await prisma.user.create({
                        data: userCreationData
                    });
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
