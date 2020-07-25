'use strict';
const NovedadNomina = require('../../enterprise_business_rules/entities/NovedadNomina');


module.exports = async (enterprise,clase,  concept,period, { novedadNominaRepository}) => {

  try {
   
   const novedadNomina = new NovedadNomina(null,enterprise,clase,null,null,concept,period,0,0,null,null,null,null); 
   const novedad=  await novedadNominaRepository.removeByConcept(novedadNomina);
   return novedad;

  } catch (error) {
    console.log(error);
    return null;    
  }



};
