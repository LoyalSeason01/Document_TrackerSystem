const { getAUserWithRole } = require('../model/rolesModel');


async function isAdmin(req, res, next){

    if(req.user.staff === null){
        return res.status(401).json({error : 'Unauthorized' }); 
    }

    const found = await getAUserWithRole(req.user.staff.staffNumber);

    if(found === null){
        return res.status(401).json({error : 'Unauthorized' });
    }

    if(found.error){
        return res.status(404).json(found);
    }

    const role = found.role.role  
    if( role === 'Admin'){
        next()
    }else{
        return res.status(401).json({error : 'Unauthorized' });
    }
 
}


module.exports = {
    isAdmin
}