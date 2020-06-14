'use strict';

const Nomina = require('../../enterprise_business_rules/entities/Nomina');

module.exports = async( enterprise,clase, employeeId, document, name,address,email,phone,period,concept,conceptName,valor,percentaje,conceptType,InitDayPay,endDayPay,type,user, { nominaRepository }) => {
  
try {
    
console.log('entro00000>>>>>>>>>', concept);
const nomina = new Nomina(null, enterprise,clase, employeeId, document, name,address,email,phone,period,concept,conceptName,valor,percentaje,conceptType,InitDayPay,endDayPay,type,user);
 
let registroNomina = await nominaRepository.persist(nomina);

return registroNomina;

} catch (error) {
    console.log(error);
    return null;   
}
  
};
