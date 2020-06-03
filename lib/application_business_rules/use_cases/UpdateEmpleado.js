
const Empleado = require('../../enterprise_business_rules/entities/Empleado');
const Persona = require('../../enterprise_business_rules/entities/Persona');


//module.exports = (enterprise, idPerson, salary, salaryType,initDateContract,endDateContract, costCenter, classPayRoll, departament,branchOffice,unity,area,active,user,{ empleadoRepository }) => {
 
  module.exports = async (employee,idPerson,{ empleadoRepository }) => {
   
    
      
    var empleado = new Empleado(null, employee.enterprise, idPerson, employee.salary,
      employee.salaryType,employee.initDateContract,employee.endDateContract, 
      employee.costCenter, employee.classPayRoll, employee.departament,employee.branchOffice,
      employee.unity,employee.area,employee.active,employee.user);

      empleadoc= await empleadoRepository.merge(empleado);


      return empleadoc;
   

  
};
