'use strict';

module.exports = async(id,{ conceptoNominaRepository }) => {

  
  const conceptoNomina =  await conceptoNominaRepository.get(id);
  return conceptoNomina;
};
