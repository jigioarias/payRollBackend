'use strict';

const CalendarioLaboral = require('../../enterprise_business_rules/entities/CalendarioLaboral');


module.exports = async (enterprise,calendarioId,fechaInicial,fechaFinal,{calendarioLaboralRepository}) => {


  
  try {
   
    const calendario = new CalendarioLaboral(calendarioId,enterprise,null,null,null); 
    const fechas =  await  calendarioLaboralRepository.getDatesByDate(calendario,fechaInicial,fechaFinal);
    return fechas;
  
  

 
} catch (error) {
   console.log('Error:',error);
   return null;
}
   
};
