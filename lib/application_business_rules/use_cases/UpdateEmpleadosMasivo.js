
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
  
  
    for (let index = 0; index < listaEmpleado.length; index++) {
        const element = listaEmpleado[index];
     //   console.log('persona'+index,element);
  
          //persona 
          mensajeValidacionPersona = PersonaRules.validateCreate(element.person);
          console.log(mensajeValidacionPersona); 
         if (mensajeValidacionPersona==null){
          personac = await personaRepository.persist(element.person);
         
           mensajeValidacionEmpleado = EmpleadoRules.validateCreate(element.employee);

                        if(mensajeValidacionEmpleado==null){
                          empleadoc = await empleadoRepository.merge(element.employee);
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
