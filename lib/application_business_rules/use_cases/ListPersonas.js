'use strict';

const empleado = require('../../enterprise_business_rules/entities/Persona');


module.exports = ({ personaRepository }) => {

   
  return personaRepository.find();
};
