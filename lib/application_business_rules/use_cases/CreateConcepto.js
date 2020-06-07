'use strict';

const Concepto = require('../../enterprise_business_rules/entities/ClaseNomina');

module.exports = ( enterprise, code, description, fittype,accountingcode,conceptType,user, { ConceptoRepository }) => {
  

const concepto = new Concepto(null, enterprise, code, description, fittype,accountingcode,conceptType,user);
 
return ConceptoRepository.persist(concepto);
    
  
};
