'use strict';

const Area = require('../../enterprise_business_rules/entities/Area');

module.exports = ( enterprise, code, unity, description,active,user, { areaRepository }) => {
  
  
  const area = new Area(null, enterprise, code,unity, description,active,user);
  var areac = null;
  
  if(area.validarDatos(area)){
      areac = areaRepository.getByDescription(description).then(function(data) { 
      return data; 
    }).catch(function(errorMessage) { 
      return areaRepository.persist(area);
  }); 
  }
return areac;
    
  
};
