const express = require('express');

const {getAllDocuments, getASingleDocument, createNewDocument,
       deleteDocument, updateDocument, }= require('../controller/documentController')
const { protect } = require('../middlewares/auth.middleware');

const documentRouter = express.Router();



documentRouter.get('/document',  protect,  getAllDocuments);

documentRouter.get('/document', protect,  getASingleDocument);

documentRouter.post('/document', protect,  createNewDocument);

documentRouter.patch('/document', protect,  updateDocument)

documentRouter.delete('/document', protect,  deleteDocument);

module.exports = documentRouter;
