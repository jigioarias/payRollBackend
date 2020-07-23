'use strict';

const ClaseNomina = require('../../enterprise_business_rules/entities/ClaseNomina');

module.exports = ( enterprise, clase, description, vacationDays,vacationPrima,primatype,provisionservicedays,provisionservicetype,payrolltype,monthhours,dayshours,bank,bankbranch,account,user,
    
    workweek,periodType,{ claseNominaRepository }) => {
  

const claseNomina = new ClaseNomina(null, enterprise, clase, description, vacationDays,vacationPrima,primatype,provisionservicedays,provisionservicetype,payrolltype,
    monthhours,dayshours,bank,bankbranch,account,user,workweek,periodType);
 
return claseNominaRepository.persist(claseNomina);
    
  
};
