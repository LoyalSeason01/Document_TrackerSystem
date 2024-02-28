const {PrismaClient} = require('@prisma/client');

const prisma = new PrismaClient();

async function getAllDocuments(userId){
    try {
         const found = await prisma.user.findUnique({
            where : {userId}
        })

        if(!found) {
            return {error : "User Not Found"}
        }
        const allDocuments = prisma.document.findMany({
            where : {userId}
        });
        return allDocuments;
    } catch (error) {
        return error
    }
}

async function getASingleDocument(ref, userId){

    try {
        const found = await prisma.document.findUnique({
            where : {ref}
        })
    
        if(!found) {
            return {error : `Document with ref Number ${ref} does not exist`}
        }

        const singleDocument = await prisma.document.findMany({
            where : {ref}
        })

        return singleDocument;
    } catch (error) {
        return error
    }

}

async function createDocument(userId, fileName, subject, ref, status){
    try {
        
        const found = await prisma.user.findUnique({
            where : {userId}
        })

        if(!found) {
            return {error : "User Not Found"}
        }

        const foundRef = await prisma.document.findUnique({
            where : {ref}
        })
    
        if(foundRef) {
            return {error : `Document with ref Number ${ref} already exist`}
        }

        const newDocument = await prisma.document.create({
          data: {
            status, 
            subject,
            fileName,
            ref, 
            userId: userId
          }
        });
    
        return {msg : "New Document created Successfully", newDocument}
      } catch (error) {
        console.error('Error creating document:', error);
      }
}

async function updateDocument(userId, fileName, subject, ref, status){

    try {
        const found = await prisma.document.findUnique({
            where : {ref}
        })
    
        if(!found) {
            return {error : `Document with ref Number ${ref} does not exist`}
        }
    
    const patchDocument = prisma.document.update({
        where : {ref},
        data : {
            status, 
            subject,
            fileName,
            ref, 
            userId: userId
        }
    });

    return patchDocument;
} catch (error) {
    return {error };
}

}

async function deleteDocument(ref, userId){

    try {
        const found = await prisma.document.findUnique({
            where : {ref}
        })
    
        if(!found) {
            return {error : `Document with ref Number ${ref} does not exist`}
        }

        const del = prisma.document.delete({
            where : {ref, userId}
        });

        return del;
    } catch (error) {
        return error;
    }
}


module.exports = {
    getAllDocuments,
    getASingleDocument,
    createDocument,
    updateDocument,
    deleteDocument
}