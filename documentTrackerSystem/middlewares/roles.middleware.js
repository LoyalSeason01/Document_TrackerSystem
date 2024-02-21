const { getAUserWithRole } = require('../model/rolesModel');


async function isAdmin(req, res, next){

    const found = await getAUserWithRole(req.body.staffNumber);

    if(found.error){
        return res.status(404).json(found);
    }

    if(found.role === 'Admin'){
       
        next()
    }else{
        return res.status(401).json({error : 'Unauthorized' });
    }
 
}

async function isStaff(req, res, next){
    if(req.body.role === 'Staff'){

    }else{

    }
}


module.exports = {
    isAdmin,
    isStaff,
}