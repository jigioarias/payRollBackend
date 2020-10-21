
const Empleado = require('../../enterprise_business_rules/entities/Empleado');
const Persona = require('../../enterprise_business_rules/entities/Persona');
const EmpleadoDTO = require('../../application_business_rules/use_cases/EmpleadoDTO');

var Promise = require('promise');
const e = require('cors');


//module.exports = (enterprise, idPerson, salary, salaryType,initDateContract,endDateContract, costCenter, classPayRoll, departament,branchOffice,unity,area,active,user,{ empleadoRepository }) => {
 
  module.exports = async(listaEmpleado,{personaRepository},{ empleadoRepository }) => {
 
    
try {
  
  
    let empleado = null;
    let  empleadoDTO = null;
    let persona = null;
    let lista = [];
    let personac =null;
    let empleadoc = null;
  
    for (let index = 1; index < listaEmpleado.length; index++) {
        const element = listaEmpleado[index];
     //   console.log('persona'+index,element);
    
        persona = new Persona(null,
          element.person.firstName,
          element.person.lastName,
          element.person.phone,
          element.person.email,
          element.person.document,
          element.person.typeDocument,
          element.person.address,
          element.person.country,
          element.person.department,
          element.person.municipality,
          element.person.user,
          element.person.civilState); 
         personac = await personaRepository.persist(persona);
        
         console.log(' Empleado  ',element.employee.enterprise); 
         new Empleado(null, 
              element.employee.enterprise, 
              personac.id, 
              element.employee.salary,
                element.employee.salaryType,
                element.employee.initDateContract,
                element.employee.endDateContract, 
                element.employee.costCenter, 
                element.employee.classPayRoll, 
                element.employee.departament,
                element.employee.branchOffice,
                element.employee.unity,
                element.employee.area,
                element.employee.active,
                element.employee.user,
                element.employee.transporteSubsidy);

                empleadoc = await empleadoRepository.persist(empleado);
  
              empleadoDTO = new EmpleadoDTO(personac,empleadoc);

            lista.push(empleadoDTO);
    }

    
   
      return lista;

    } catch (error) {
      console.log(error);
      return null;
    }  
  
}; 
