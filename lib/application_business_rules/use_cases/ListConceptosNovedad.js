'use strict';

module.exports = (enterprise,conceptType,{ conceptoRepository }) => {

  
  return conceptoRepository.findByType(enterprise,conceptType);
};
