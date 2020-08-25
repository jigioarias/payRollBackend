'use strict';
const Licencia = require('../../enterprise_business_rules/entities/Licencia');
const { register } = require('hapi-swagger');


module.exports = async (enterprise, document, initDate, endDate,type, remuneration,user,employeeId,year, registerPeriod,clase,salary,active,{ licenciaRepository}) => {

  try {

   
  
   
   const licencia =    new Licencia(
    null, enterprise, document, initDate, 
    endDate,type, 
    remuneration,user,
    employeeId,year,
     registerPeriod,clase,
    salary,active); 
   
   
   const guardarLicencia=  await licenciaRepository.persist(licencia);
    return  guardarLicencia;

  } catch (error) {
    console.log(error);
    return null;    
  }



};
