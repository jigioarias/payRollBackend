'use strict';

const Persona = require('../../enterprise_business_rules/entities/Persona');
const PersonaDTO = require('../../application_business_rules/use_cases/PersonaDTO');


module.exports = async (person,{ personaRepository }) => {
  
  
    const persona = new Persona(null, person.firstName, person.lastName, person.phone,person.email,
        person.document,person.typeDocument,person.address,person.country,
        person.department,person.municipality,person.user,person.civilState);

        let personac = null;
        let personaDTO = null; 
        
 
        let mensajeValidacionPersona =mensajeValidacionPersona = PersonaRules.validateCreate(persona);
        console.log(mensajeValidacionPersona); 
       if (mensajeValidacionPersona==null){
           personac = await personaRepository.persist(persona);
           personaDTO = new PersonaDTO(personac);
        }else{
          personaDTO = new PersonaDTO(persona);
          personaDTO.setError(mensajeValidacionPersona);
        
        }
      
        return personaDTO;

    
  
};