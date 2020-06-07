'use strict';

const ConceptoseNomina = require('../../enterprise_business_rules/entities/ConceptosNomina');

module.exports = ( enterprise, clase, concept, active,user, { conceptoNominaRepository }) => {
  
    console.log(' create active>>>>>>',active);

const conceptoNomina = new ConceptoseNomina(null, enterprise, clase, concept, active,user);


return conceptoNominaRepository.persist(conceptoNomina);
    
  
};
