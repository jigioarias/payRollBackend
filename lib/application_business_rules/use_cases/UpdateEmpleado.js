
const Empleado = require('../../enterprise_business_rules/entities/Empleado');
const EmpleadoDTO = require('../../application_business_rules/use_cases/EmpleadoDTO');
const {ERROR_TECNICO, ERROR_VALIDATE} =require('./constantesValidacion');
const EmpleadoRules = require('../../application_business_rules/use_cases/EmpleadoRules');


//module.exports = (enterprise, idPerson, salary, salaryType,initDateContract,endDateContract, costCenter, classPayRoll, departament,branchOffice,unity,area,active,user,{ empleadoRepository }) => {
 
  module.exports = async (employee,persona,{ empleadoRepository }) => {
   
    let empleadoDTO = null;
    let mensajeValidacionEmpleado = null;

    try {
      
    var empleado = new Empleado(employee.id, employee.enterprise, persona.id, employee.salary,
      employee.salaryType,employee.initDateContract,employee.endDateContract, 
      employee.costCenter, employee.classPayRoll, employee.departament,employee.branchOffice,
      employee.unity,employee.area,employee.active,employee.user,employee.transporteSubsidy);

      mensajeValidacionEmpleado = EmpleadoRules.validateCreate(empleado);
   
     if (mensajeValidacionEmpleado == null){
      empleadoc= await empleadoRepository.merge(empleado);
      empleadoDTO = new EmpleadoDTO(persona,empleadoc);
     }else{
        empleadoDTO = new EmpleadoDTO(persona,null);
        empleadoDTO.setError(ERROR_VALIDATE+':'+mensajeValidacionEmpleado);
     }

    } catch (error) {
      console.log(error);
      empleadoDTO = new EmpleadoDTO(null,null);
      empleadoDTO.setError(ERROR_TECNICO+':'+error);
    }

      return empleadoDTO;
   

  
};
