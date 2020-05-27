'use strict';

const CentroCostos = require('../../enterprise_business_rules/entities/CentroCostos');

module.exports = ( enterprise, code,  description,active,user,branchOffice, { centroCostosRepository }) => {
  
  
  const centroCostos = new CentroCostos(null, enterprise, code, description,active,user,branchOffice);
  var centroCostosc = null;
  if(centroCostos.validarDatos(centroCostos)){
      centroCostosc = centroCostosRepository.getByDescription(description).then(function(data) { 
      return data; 
    }).catch(function(errorMessage) { 

      return centroCostosRepository.persist(centroCostos);
  }); 
  }
return centroCostosc;
    
  
};
