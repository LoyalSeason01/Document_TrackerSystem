const { Prisma } = require('@prisma/client');
const documentModel = require('../model/documentModel');
const {validationResult} = require('express-validator');


async function getAllDocuments(req, res){
    const { userId }= req.user.user
    return res.status(200).send(await documentModel.getAllDocuments(userId));
}

async function getASingleDocument(req, res){
    const {ref} = req.params;
    const {userId} = req.user.user
    return res.status(200).send(await documentModel.getASingleDocument(ref, userId));
}

async function createNewDocument(req, res){

    try {
    const {fileName, subject, ref, status} = req.body;

    const {userId} = req.user.user

   
    const error =  validationResult(req)

    if(!error.isEmpty()){
        return res.status(400).json({error : error.array()});
    }

    const createNewDocument = await documentModel.createDocument(userId, fileName, subject, ref, status);

    return res.status(200).send(createNewDocument);
    } catch (error) {
        return error;
    }

}

async function updateDocument(req, res){

    try {
        const {fileName, subject, ref, status} = req.body;
        const {userId} = req.user.user
    
        return res.status(200).send(await documentModel.updateDocument(userId, fileName, subject, ref, status));
    } catch (error) {
        return error
    }

}

async function deleteDocument(req, res){
    const {ref} = req.body
    const {userId} = req.user.user
    return res.status(200).send(await documentModel.deleteDocument(ref, userId));
}



module.exports = {
    getAllDocuments,
    getASingleDocument,
    createNewDocument,
    updateDocument,
    deleteDocument
}