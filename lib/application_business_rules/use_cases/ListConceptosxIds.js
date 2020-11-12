'use strict';

module.exports = (filter, { conceptoRepository }) => {
  
  console.log('filtroooo>>>',filter);  
  return conceptoRepository.getConceptsByCodigos(filter.enterprise,filter.listConcepts);
};
