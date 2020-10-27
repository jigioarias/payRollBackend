'use strict';

const Persona = require('../../enterprise_business_rules/entities/Persona');
const PersonaDTO = require('../../application_business_rules/use_cases/PersonaDTO');
const PersonaRules = require('../../application_business_rules/use_cases/PersonaRules');
const {ERROR_TECNICO} =require('./constantesValidacion');


module.exports = async (person,{ personaRepository }) => {

  let mensajeValidacionPersona = null;
  let personac = null;
  let personaDTO = null; 

  try {
    
 
    const persona = new Persona(null, person.firstName, person.lastName, person.phone,person.email,
        person.document,person.typeDocument,person.address,person.country,
        person.department,person.municipality,person.user,person.civilState);
        mensajeValidacionPersona =mensajeValidacionPersona = PersonaRules.validateCreate(persona);
        console.log(mensajeValidacionPersona); 
       if (mensajeValidacionPersona==null){
           personac = await personaRepository.persist(persona);
           personaDTO = new PersonaDTO(personac);
        }else{
          personaDTO = new PersonaDTO(persona);
          personaDTO.setError(mensajeValidacionPersona);
        
        }
      

      } catch (error) {
        personaDTO = new PersonaDTO(null);
        personaDTO.setError(ERROR_TECNICO+':'+error);
      }
        return personaDTO;

    
  
};