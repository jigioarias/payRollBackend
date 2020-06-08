'use strict';

module.exports = ( enterprise,clase,active, { periodClaseRepository }) => {

  
  return periodClaseRepository.findByClassPayRoll(enterprise,clase,active);
};
