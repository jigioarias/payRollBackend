'use strict';

module.exports = (filter, { conceptoRepository }) => {
  
  
  return conceptoRepository.getConceptsByCodigos(filter.enterprise,filter.listConcepts);
};
