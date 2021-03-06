'use strict';

const ConceptoseNomina = require('../../enterprise_business_rules/entities/ConceptosNomina');
const ConceptoNominaRules = require('../../application_business_rules/use_cases/ConceptoNominaRules');
const {ERROR_TECNICO} =require('./constantesValidacion');
const ConceptoNominaDTO = require('../../application_business_rules/use_cases/ConceptoNominaDTO');




module.exports = async( enterprise, clase, concept, active,user, { conceptoNominaRepository }) => {
  
    let conceptoNominac = null;
    let mensajeValidacionConceptoNomina = null;
    let conceptoNominaDTO = null;
     try {
    
        const conceptoNomina = new ConceptoseNomina(null, enterprise, clase, concept, active,user); 
        ConceptoNominaRules.validateCreate(conceptoNomina);

        if (mensajeValidacionConceptoNomina == null){
          conceptoNominac = await conceptoNominaRepository.persist(conceptoNomina);
          conceptoNominaDTO = new ConceptoNominaDTO(conceptoNominac);
  
          } else{
            conceptoNominaDTO = new ConceptoNominaDTO(conceptoNominac);
            conceptoNominaDTO.setError(mensajeValidacionConceptoNomina);
          }  
  
  } catch (error) {
    console.log(error);
    conceptoNominaDTO = new ConceptoNominaDTO(null);
    conceptoNominaDTO.setError(ERROR_TECNICO+':'+error); 
  }
  return conceptoNominaDTO;
  
};
