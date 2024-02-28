const express = require('express');
const {check} = require('express-validator')

const {getAllDocuments, getASingleDocument, createNewDocument,
       deleteDocument, updateDocument, }= require('../controller/documentController')
const { protect } = require('../middlewares/auth.middleware');

const documentRouter = express.Router();

const validation = [
                        check('fileName').notEmpty().withMessage('FileName cannot be Empty'),
                        check('subject').notEmpty().withMessage('Subject cannot be Empty'),
                        check('ref').notEmpty().withMessage('Ref cannot be Empty'),
                        check('status').notEmpty().withMessage('Status cannot be Empty')
                    ]


documentRouter.get('/document',   protect, getAllDocuments);

documentRouter.get('/document/:ref', protect,  getASingleDocument);

documentRouter.post('/document', protect,  validation, createNewDocument);

documentRouter.patch('/document', protect,  updateDocument)

documentRouter.delete('/document', protect,  deleteDocument);

module.exports = documentRouter;
