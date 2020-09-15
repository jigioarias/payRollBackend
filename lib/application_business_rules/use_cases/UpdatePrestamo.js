'use strict';

const Persona = require('../../enterprise_business_rules/entities/Persona');


module.exports = async (prestamoEntity,{ prestamoRepository }) => {
  
  
      let prestamoc = await prestamoRepository.merge(prestamoEntity);

      return prestamoc;

    
  
};