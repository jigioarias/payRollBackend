'use strict';

module.exports = ( enterprise,clase,active, { periodoClaseRepository }) => {

  
  return periodoClaseRepository.findByClassPayRoll(enterprise,clase,active);
};
