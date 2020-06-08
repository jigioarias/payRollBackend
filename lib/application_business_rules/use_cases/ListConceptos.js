'use strict';

module.exports = (enterprise, { conceptoRepository }) => {

  
  return conceptoRepository.find(enterprise);
};
