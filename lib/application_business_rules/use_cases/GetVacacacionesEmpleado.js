'use strict';
const Vacacion = require('../../enterprise_business_rules/entities/Vacacion');
const { register } = require('hapi-swagger');


module.exports = async (enterprise, document, enjoyInitDate, enjoyEndDate,employeeId,year, clase, { vacacionRepository}) => {

  try {

   
   
   const vacacion = new Vacacion(null,enterprise, document, enjoyInitDate, enjoyEndDate,null, null,null,employeeId,year, null,clase,null,null); 
   
   
   const guardarVacacion =  await vacacionRepository.persist(vacacion);
    return  guardarVacacion;

  } catch (error) {
    console.log(error);
    return null;    
  }



};
