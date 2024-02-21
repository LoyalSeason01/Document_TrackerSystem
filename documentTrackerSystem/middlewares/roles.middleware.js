const { getAUserWithRole } = require('../model/rolesModel');

async function isAdmin(req, res, next){

    const found = await getAUserWithRole(req.body.staffNumber);

    if(!found){
        return res.status(404).json({error : 'Forbidden' });
    }

    console.log('Authorized', found)
    next()
    // if(found.role === 'Admin'){

    // }else{

    // }
    
}

async function isStaff(req, res, next){
    if(req.body.role === 'Staff'){

    }else{

    }
}

async function isUser(req, res, next){
    if(req.body.role === 'Staff'){

    }else{

    }
}

module.exports = {
    isAdmin,
    isStaff,
    isUser,
}