'use strict';

module.exports = (empresa,{ periodoClaseRepository }) => {

  
  return periodoClaseRepository.find(empresa);
};
