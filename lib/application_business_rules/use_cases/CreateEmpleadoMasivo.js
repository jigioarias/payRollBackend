
const Empleado = require('../../enterprise_business_rules/entities/Empleado');
const Persona = require('../../enterprise_business_rules/entities/Persona');
const EmpleadoDTO = require('../../application_business_rules/use_cases/EmpleadoDTO');
const ListaEmpleadoDTO = require('../../application_business_rules/use_cases/ListaEmpleadoDTO');
const EmpleadoRules = require('../../application_business_rules/use_cases/EmpleadoRules');
const PersonaRules = require('../../application_business_rules/use_cases/PersonaRules');
const {CARGA_MASIVA_EMPLEADO} =require('./constantesValidacion');


//module.exports = (enterprise, idPerson, salary, salaryType,initDateContract,endDateContract, costCenter, classPayRoll, departament,branchOffice,unity,area,active,user,{ empleadoRepository }) => {
 
  module.exports = async(listaEmpleado,{personaRepository},{ empleadoRepository }) => {
 
    
try {
  
  
    let empleado = null;
    let empleadoDTO = null;
    let listaEmpleadoDTO = null;
    let persona = null;
    let lista = [];
    let personac =null;
    let empleadoc = null;
    let mensajeValidacionPersona = null;
    let mensajeValidacionEmpleado = null;
    let erroresLista = false;
  
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

          console.log('compa', element.person.civilState,persona.civilState);
          //persona 
          mensajeValidacionPersona = PersonaRules.validateCreate(persona);
          console.log(mensajeValidacionPersona); 
         if (mensajeValidacionPersona==null){
          personac = await personaRepository.persist(persona);
        

         //console.log(' Empleado  ',element.employee.enterprise); 
              empleado =new Empleado(null, 
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
                        mensajeValidacionEmpleado = EmpleadoRules.validateCreate(empleado);

                        if(mensajeValidacionEmpleado==null){
                          empleadoc = await empleadoRepository.persist(empleado);
                          empleadoDTO = new EmpleadoDTO(personac,empleadoc);
                        }else{
                           
                           personaRepository.remove(personac.id);
                           empleadoDTO = new EmpleadoDTO(personac,empleado);
                           empleadoDTO.setError(mensajeValidacionEmpleado);
                           erroresLista = true;
                        }
                        
            }else{
              
              empleadoDTO = new EmpleadoDTO(persona,empleado)
              empleadoDTO.setError(mensajeValidacionPersona);
              erroresLista =true;
            }  
             
              empleadoc = null;
              empleado = null;
              persona= null;
              personac = null;
              mensajeValidacionPersona = null;
              mensajeValidacionEmpleado = null;
            lista.push(empleadoDTO);
    }
      if(erroresLista){
        listaEmpleadoDTO = new ListaEmpleadoDTO(lista,CARGA_MASIVA_EMPLEADO)
      } else{
        listaEmpleadoDTO = new ListaEmpleadoDTO(lista,null);

      }   
   
      return listaEmpleadoDTO;

    } catch (error) {
      console.log(error);
      return null;
    }  
  
}; 
