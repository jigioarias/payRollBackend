'use strict';

module.exports = (enterprise,active, { conceptoNominaRepository }) => {

  
  return conceptoNominaRepository.find(enterprise,active);

  
};
