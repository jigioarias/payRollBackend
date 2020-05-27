'use strict';

const empleado = require('../../enterprise_business_rules/entities/Empleado');


module.exports = (idPerson,{ empleadoRepository }) => {

   
  return empleadoRepository.findByIdPerson(idPerson);
};
