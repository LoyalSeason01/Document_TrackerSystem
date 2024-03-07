const express = require('express');
const {check} = require('express-validator')

const {getAllDocuments, getASingleDocument, createNewDocument,
       deleteDocument, updateDocument, uploadDocument, }= require('../controller/documentController')
const { protect } = require('../middlewares/auth.middleware');
const { PERMISSIONS } = require('../utils/role.permissions');
const { hasPermission } = require('../middlewares/roles.middleware');




const documentRouter = express.Router();

const validation = [
                        check('fileName').notEmpty().withMessage('FileName cannot be Empty'),
                        check('subject').notEmpty().withMessage('Subject cannot be Empty'),
                        check('ref').notEmpty().withMessage('Ref cannot be Empty'),
                        check('status').notEmpty().withMessage('Status cannot be Empty'),
                ]





documentRouter.get('/document',   protect, hasPermission([PERMISSIONS.READ_DOCUMENT]), getAllDocuments);

documentRouter.get('/document/:ref', protect, hasPermission([PERMISSIONS.READ_DOCUMENT]),  getASingleDocument);

documentRouter.post('/document', protect,  validation, hasPermission([PERMISSIONS.CREATE_DOCUMENT]), createNewDocument);

documentRouter.patch('/document', protect, hasPermission([PERMISSIONS.UPDATE_DOCUMENT]), updateDocument);

documentRouter.post('/upload', protect, uploadDocument);
   


documentRouter.delete('/document', protect, hasPermission([PERMISSIONS.DELETE_DOCUMENT]), deleteDocument);

module.exports = documentRouter;
