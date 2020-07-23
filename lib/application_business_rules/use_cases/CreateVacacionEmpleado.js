'use strict';
const Vacacion = require('../../enterprise_business_rules/entities/Vacacion');
const { register } = require('hapi-swagger');


module.exports = async (enterprise, document, enjoyInitDate, enjoyEndDate,moneyDays, remuneration,user,employeeId,year, registerPeriod,clase,enjoyDays,salary,active,{ vacacionRepository}) => {

  try {

   
   
   const vacacion = new Vacacion(null,enterprise, document, enjoyInitDate, enjoyEndDate,moneyDays, remuneration,user,employeeId,year, registerPeriod,clase,enjoyDays,salary,active); 
   
   
   const guardarVacacion =  await vacacionRepository.persist(vacacion);
    return  guardarVacacion;

  } catch (error) {
    console.log(error);
    return null;    
  }



};
