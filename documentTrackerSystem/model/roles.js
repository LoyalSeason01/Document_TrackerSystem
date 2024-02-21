const {PrismaClient} = require('@prisma/client');

const prisma = new PrismaClient();

async function getAllRolesAndUsers(){
    return {msg : 'Got all Users and Their Roles'}
}

async function getAUserWithRole(){
    return {msg : 'Got A specific User With Role'}
}

async function createRoleForUser(){
    return {msg : 'Created Role for user'}
}

async function updateRoleOfUser(){
    return {msg : 'Updated Role of User'}
}

async function deleteRoleOfUser(){
    return {msg : 'Deleted Role of User'}
}

module.exports = {
    getAllRolesAndUsers,
    getAUserWithRole,
    createRoleForUser,
    updateRoleOfUser,
    deleteRoleOfUser,
}