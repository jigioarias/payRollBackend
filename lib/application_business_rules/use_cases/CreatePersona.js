'use strict';

const Persona = require('../../enterprise_business_rules/entities/Persona');


module.exports = (person,{ personaRepository }) => {
  
  
    const persona = new Persona(null, person.firstName, person.lastName, person.phone,person.email,
        person.document,person.typeDocument,person.address,person.country,
        person.department,person.municipality,person.user,person.civilState);
  
 
      return personaRepository.persist(persona);

    
  
};