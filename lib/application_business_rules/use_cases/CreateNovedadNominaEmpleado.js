'use strict';
const NovedadNomina = require('../../enterprise_business_rules/entities/NovedadNomina');


module.exports = async (enterprise,clase, employeeId, document, concept,period,valor,hours,InitDayPay,endDayPay,user,type,state, { novedadNominaRepository}) => {

  try {

   const novedadNomina = new NovedadNomina(null,enterprise,clase,employeeId,document,concept,period,valor,hours,InitDayPay,endDayPay,user,type,state); 
   
   
   const novedad=  await novedadNominaRepository.persist(novedadNomina);
    return novedadNomina;

  } catch (error) {
    console.log(error);
    return null;    
  }



};
