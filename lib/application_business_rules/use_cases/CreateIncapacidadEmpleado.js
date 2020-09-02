'use strict';
const Incapacidad = require('../../enterprise_business_rules/entities/Incapacidad');
const { register } = require('hapi-swagger');


module.exports = async (enterprise, document, initDate, endDate,type,user,employeeId,year, registerPeriod,clase,salary,active,percentage,{ incapacidadRepository}) => {

  try {

   
  
   
   const incapacidad =   
    new Incapacidad(
    null, enterprise, document, initDate, 
    endDate,type, 
    user,
    employeeId,year,
     registerPeriod,clase,
    salary,active,
    percentage); 
   
   
   const guardarIncapacidad=  await incapacidadRepository.persist(incapacidad);
    return  guardarIncapacidad;

  } catch (error) {
    console.log(error);
    return null;    
  }



};
