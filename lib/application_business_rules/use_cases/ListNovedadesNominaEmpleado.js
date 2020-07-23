'use strict';
const NovedadNomina = require('../../enterprise_business_rules/entities/NovedadNomina');


module.exports = async (enterprise,clase,period,employeeId, { novedadNominaRepository}) => {

  try {

   
   const novedadNomina = new NovedadNomina(null,enterprise,clase,employeeId,null,null,period,null,null,null,null,null,null); 
   
   
   const lista =  await novedadNominaRepository.findByEmployee(novedadNomina);
    return lista;

  } catch (error) {
    console.log(error);
    return null;    
  }



};
