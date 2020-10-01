'use strict';

const Concepto = require('../../enterprise_business_rules/entities/ClaseNomina');

module.exports = ( enterprise, code, description, fittype,accountingcode,conceptType,user,value,percentaje,maxRegisterHour, { ConceptoRepository }) => {
  

const concepto = new Concepto(null, enterprise, code, description, fittype,accountingcode,conceptType,user,value,percentaje,maxRegisterHour);
 
return ConceptoRepository.persist(concepto);
    
  
};
