const express = require('express');

const {getAllDocuments, getASingleDocument, createNewDocument,
       deleteDocument, updateDocument, }= require('../controller/documentController')
const { protect } = require('../middlewares/auth.middleware');

const documentRouter = express.Router();



documentRouter.get('/document',  protect, isAdmin, getAllDocuments);

documentRouter.get('/document', protect, isAdmin, getASingleDocument);

documentRouter.post('/document', protect, isAdmin, createNewDocument);

documentRouter.patch('/document', protect, isAdmin, updateDocument)

documentRouter.delete('/document', protect, isAdmin, deleteDocument);

module.exports = documentRouter;
