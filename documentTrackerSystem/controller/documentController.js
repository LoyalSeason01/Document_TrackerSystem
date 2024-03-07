const { Prisma } = require('@prisma/client');
const documentModel = require('../model/documentModel');
const {validationResult} = require('express-validator');
const upload = require('../middlewares/attachmentMiddleware');
const multer = require('multer');

async function getAllDocuments(req, res){
    const { userId }= req.user
    return res.status(200).send(await documentModel.getAllDocuments(userId));
}

async function getASingleDocument(req, res){
    const {ref} = req.params;
    const {userId} = req.user
    return res.status(200).send(await documentModel.getASingleDocument(ref, userId));
}

async function createNewDocument(req, res){

    try {
    const {fileName, subject, ref, status} = req.body;

    const {userId} = req.user

   
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
        const {userId} = req.user
    
        return res.status(200).send(await documentModel.updateDocument(userId, fileName, subject, ref, status));
    } catch (error) {
        return error
    }

}

async function uploadDocument(req, res){


    upload(req, res, function (err) {
        if (err instanceof multer.MulterError) {

            return res.status(400).json({ message: 'Multer error occurred', error: err.message });
        } else if (err) {

           return res.status(400).json({ message: 'An error occurred during file upload', error: err.message });
        } else if (!req.file) {

           return res.status(400).json({ message: 'No file uploaded' });
        }
        
        res.json({ msg: "File Uploaded Successfully" });
    });
}

async function deleteDocument(req, res){
    const {ref} = req.body
    const {userId} = req.user
    return res.status(200).send(await documentModel.deleteDocument(ref, userId));
}



module.exports = {
    getAllDocuments,
    getASingleDocument,
    createNewDocument,
    updateDocument,
    uploadDocument,
    deleteDocument
}