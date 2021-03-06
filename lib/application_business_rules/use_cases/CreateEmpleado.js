
const Empleado = require('../../enterprise_business_rules/entities/Empleado');
const EmpleadoRules = require('../../application_business_rules/use_cases/EmpleadoRules');
const EmpleadoDTO = require('../../application_business_rules/use_cases/EmpleadoDTO');
const {ERROR_TECNICO} =require('./constantesValidacion');


//module.exports = (enterprise, idPerson, salary, salaryType,initDateContract,endDateContract, costCenter, classPayRoll, departament,branchOffice,unity,area,active,user,{ empleadoRepository }) => {
 
  module.exports = async(employee,persona,{ empleadoRepository }) => {

    let empleadoc = null;
    let mensajeValidacionEmpleado = null;
    let empleadoDTO = null;
    
    try {
      
        var empleado = new Empleado(null, employee.enterprise, persona.id, employee.salary,
          employee.salaryType,employee.initDateContract,employee.endDateContract, 
          employee.costCenter, employee.classPayRoll, employee.departament,employee.branchOffice,
          employee.unity,employee.area,employee.active,employee.user,employee.transporteSubsidy);

          mensajeValidacionEmpleado = EmpleadoRules.validateCreate(empleado);
         // console.log(mensajeValidacionEmpleado); 
        if (mensajeValidacionEmpleado == null){
          empleadoc = await empleadoRepository.persist(empleado);
          }   
          
          empleadoDTO = new EmpleadoDTO(persona,empleadoc);
    } catch (error) {
          empleadoDTO = new EmpleadoDTO(null,null);
          empleadoDTO.setError(ERROR_TECNICO+':'+error); 
    }

    return empleadoDTO;
  
}; 
