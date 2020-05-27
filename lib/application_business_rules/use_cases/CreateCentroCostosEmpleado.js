'use strict';

const User = require('../../enterprise_business_rules/entities/CentroCostosEmpleado');


module.exports = (nit, branchOffice, costCenter, employee, { centroCostosEmpleadoRepository }) => {
  
  
  const centroCostosEmpleado = new CentroCostos(null,nit, branchOffice, costCenter, employee);
  var centroCostosempleadoc = null;
  
  if(centroCostosEmpleado.validarDatos(centroCostosEmpleado)){
      centroCostosempleadoc = centroCostosEmpleadoRepository.getByDocument(document).then(function(data) { 
      return data; 
    }).catch(function(errorMessage) { 
      return centroCostosEmpleadoRepository.persist(centroCostosEmpleado);
  }); 
  }
return centroCostosEmpleadoc;
 
};
