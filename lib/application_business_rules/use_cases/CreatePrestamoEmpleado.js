'use strict';
const Prestamo = require('../../enterprise_business_rules/entities/Prestamo');
const { register } = require('hapi-swagger');


module.exports = async (enterprise,employeeId, document, initDate,valor, balance,aproveDate,year,aprovePeriod,clase,interests,state,observation,user,{ prestamoRepository}) => {

  try {

   
   
   const prestamo = new Prestamo(null,enterprise,employeeId, document, initDate,valor, balance,aproveDate,year,aprovePeriod,clase,interests,state,observation,user); 
   
   
   const guardarPrestamo =  await prestamoRepository.persist(prestamo);
    return  guardarPrestamo;

  } catch (error) {
    console.log(error);
    return null;    
  }



};
