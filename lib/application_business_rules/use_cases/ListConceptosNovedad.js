'use strict';

module.exports = (enterprise,active,conceptType,{ conceptoRepository }) => {

  
  return conceptoRepository.findByType(enterprise,conceptType);
};
