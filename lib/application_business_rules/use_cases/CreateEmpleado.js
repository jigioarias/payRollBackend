const Empleado = require('../../enterprise_business_rules/entities/Empleado');
const Persona = require('../../enterprise_business_rules/entities/Persona');
var Promise = require('promise');


//module.exports = (enterprise, idPerson, salary, salaryType,initDateContract,endDateContract, costCenter, classPayRoll, departament,branchOffice,unity,area,active,user,{ empleadoRepository }) => {
 
  module.exports = (employee,idPerson,{ empleadoRepository }) => {
 
    
    return new Promise(function(resolve, reject) {
      
    var empleado = new Empleado(null, employee.enterprise, idPerson, employee.salary,
      employee.salaryType,employee.initDateContract,employee.endDateContract, 
      employee.costCenter, employee.classPayRoll, employee.departament,employee.branchOffice,
      employee.unity,employee.area,employee.active,employee.user);
     
      
   var empleadoc = null;
    try{  
    empleadoc= empleadoRepository.persist(empleado);
    }catch(error){
      
      empleadoc = empleadoRepository.getByIdPerson(idPerson);

    }
     resolve( empleadoc);
    });

  
};
