'use strict';

const empleado = require('../../enterprise_business_rules/entities/Empleado');


module.exports = ({ empleadoRepository }) => {

   
  return empleadoRepository.find();
};
