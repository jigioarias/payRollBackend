'use strict';

const PrestacionSocial = require('../../enterprise_business_rules/entities/PrestacionSocial');



module.exports =async ( enterprise,clase,period,type,{prestacionSocialRepository}) => {

    try {
        

   if(type=='P'){    
  
    const prestacionSocial = new PrestacionSocial(null, enterprise,clase, null, null, period,null,null,null,null,null,null,null);
    
    return  await prestacionSocialRepository.remove(prestacionSocial);

    }
    return false;

    } catch (error) {
        console.log(error);
        return false;

    }

  
};
