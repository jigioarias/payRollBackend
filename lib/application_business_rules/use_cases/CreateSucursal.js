'use strict';

const Sucursal = require('../../enterprise_business_rules/entities/Sucursal');

module.exports = ( enterprise, code, address, description,phone,active,user, { sucursalRepository }) => {
  
  
  const sucursal = new Sucursal(null, enterprise, code, address, description,phone,active,user);
  var sucursalc = null;
  
  if(sucursal.validarDatos(sucursal)){
      sucursalc = sucursalRepository.getByDescription(description).then(function(data) { 
      return data; 
    }).catch(function(errorMessage) { 
      return sucursalRepository.persist(sucursal);
  }); 
  }
return sucursalc;
    
  
};
