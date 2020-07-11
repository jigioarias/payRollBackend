'use strict';

const PreatacionSocial = require('../../enterprise_business_rules/entities/PrestacionSocial');
const nomina = require('../../frameworks_drivers/webserver/nomina');


module.exports = async( enterprise,clase,employeeId,document, period, diasVacacionesEmpleado,monthSalary, salary,InitDayPay, endDayPay, user,discount, { prestacionSocialRepository }) => {
  
try {
    


 
 
  let prestacionDiasVacaciones =null;
  let guardoPrestacionDiasVacacion= null;
  
  


        prestacionDiasVacaciones = new PreatacionSocial(null, enterprise,
          clase, employeeId,
          document, period,
          diasVacacionesEmpleado,monthSalary,
          salary,InitDayPay,
          endDayPay,'DIAS_VACACIONES',
          user,discount);
         guardoPrestacionDiasVacacion = await prestacionSocialRepository.persist(prestacionDiasVacaciones);
           
         return guardoPrestacionDiasVacacion;

} catch (error) {
    console.log(error);
    return null;   
}
  
};
