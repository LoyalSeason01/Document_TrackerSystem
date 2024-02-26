const { getAUserWithRole } = require('../model/rolesModel');


function hasPermission(permissions){

 

    return async(req, res, next) => {
        if(req.user.staff === null ){
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
        
        if (!permissions.includes(role)) {
            return res.status(401).json({error : 'Unauthorized' });
        }

        next()
    
    } 
 
}





module.exports = {
    hasPermission
}