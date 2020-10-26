'use strict';

const Persona = require('../../enterprise_business_rules/entities/Persona');
const PersonaDTO = require('../../application_business_rules/use_cases/PersonaDTO');
const PersonaRules = require('../../application_business_rules/use_cases/PersonaRules');

const {ERROR_TECNICO,ERROR_VALIDATE} =require('./constantesValidacion');


module.exports = async (person,{ personaRepository }) => {
  
  let personaDTO = null; 
  let mensajeValidacionPersona = null;
  let personac = null;
  try {
    
   
    const persona = new Persona(person.id, person.firstName, person.lastName, person.phone,person.email,
        person.document,person.typeDocument,person.address,person.country,
        person.department,person.municipality,person.user,person.civilState);
  
       mensajeValidacionPersona =mensajeValidacionPersona = PersonaRules.validateCreate(persona);
      
       if (mensajeValidacionPersona==null){

           personac = await personaRepository.merge(persona);
          personaDTO = new PersonaDTO(personac);
       }else{
          personaDTO = new PersonaDTO(personac);
          personaDTO.setError(ERROR_VALIDATE+':'+mensajeValidacionPersona)

       }

    } catch (error) {
      console.log(error);
      personaDTO = new PersonaDTO(null);
      personaDTO.setError(ERROR_TECNICO+':'+error);

    }
   
    return personaDTO;
};