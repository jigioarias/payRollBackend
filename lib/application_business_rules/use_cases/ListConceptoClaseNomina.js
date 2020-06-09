'use strict';

module.exports = (enterprise,clase,active, { conceptoNominaRepository }) => {

  
  return conceptoNominaRepository.findByClassPayRoll(enterprise,clase,active);
};
