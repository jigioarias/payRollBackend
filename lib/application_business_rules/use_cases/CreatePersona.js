'use strict';

const Persona = require('../../enterprise_business_rules/entities/Persona');


module.exports = async (person,{ personaRepository }) => {
  
  
    const persona = new Persona(null, person.firstName, person.lastName, person.phone,person.email,
        person.document,person.typeDocument,person.address,person.country,
        person.department,person.municipality,person.user,person.civilState);
  
 
      let personac = await personaRepository.persist(persona);
      return personac;

    
  
};