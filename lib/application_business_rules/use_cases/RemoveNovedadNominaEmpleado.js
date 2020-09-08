'use strict';
const NovedadNomina = require('../../enterprise_business_rules/entities/NovedadNomina');


module.exports = async (enterprise,clase,period,state, { novedadNominaRepository}) => {

  try {
   const novedadNomina = new NovedadNomina(null,enterprise,clase,null,null,null,period,0,0,null,null,null,null,state); 
   const novedad=  await novedadNominaRepository.remove(novedadNomina);
   return novedad;

  } catch (error) {
    console.log(error);
    return null;    
  }



};
