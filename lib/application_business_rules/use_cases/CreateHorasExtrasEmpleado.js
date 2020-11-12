'use strict';
const HorasExtras = require('../../enterprise_business_rules/entities/HorasExtras');


module.exports = async (enterprise,clase, employeeId, document, concept,period,valor,hours,InitDayPay,endDayPay,user,type,noveltyDate, { horasExtrasRepository}) => {

  try {

   const horasExtrasNomina = new HorasExtras(null,enterprise,clase,employeeId,document,concept,period,valor,hours,InitDayPay,endDayPay,user,type,noveltyDate); 
   const horasExtras=  await horasExtrasRepository.persist(horasExtrasNomina);
   
   return horasExtras;

  } catch (error) {
    console.log(error);
    return null;    
  }



};
