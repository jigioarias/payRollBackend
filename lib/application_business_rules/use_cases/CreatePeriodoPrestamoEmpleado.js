'use strict';
const PeriodoPrestamo = require('../../enterprise_business_rules/entities/PeriodoPrestamo');
const { register } = require('hapi-swagger');


module.exports = async (enterprise,employeeId, document, idLoan,fee, interests,period,type,state,user,{ periodoPrestamoRepository}) => {

  try {

   
   
   const periodoPrestamo = new PeriodoPrestamo(null,enterprise,employeeId, document, idLoan,fee, interests,period,type,state,user); 
   
   
   const guardarPeriodoPrestamo =  await periodoPrestamoRepository.persist(periodoPrestamo);
    return  guardarPeriodoPrestamo;

  } catch (error) {
    console.log(error);
    return null;    
  }



};
