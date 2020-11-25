'use strict';

module.exports = (enterprise, { coleccionRepository }) => {

  
  return coleccionRepository.find(enterprise);
};
