'use strict';
const Nomina = require('../../enterprise_business_rules/entities/Nomina');


module.exports =async ( enterprise,clase,period,type, { nominaRepository }) => {

  try {
    
  const nomina = new Nomina(null, enterprise,clase, null, null, null,null,null,null,period,null,null,null,null,null,null,null,type,null);
  
  return  await nominaRepository.find(nomina);
} catch (error) {

  return null;
    
}


};
