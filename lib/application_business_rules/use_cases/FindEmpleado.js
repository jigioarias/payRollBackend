'use strict';

const Empleado = require('../../enterprise_business_rules/entities/Empleado');
const Persona = require('../../enterprise_business_rules/entities/Persona');
const EmpleadoDTO = require('../../application_business_rules/use_cases/EmpleadoDTO');
const { ERROR_TECNICO, EMPLEADO_NO_ENCONTRADO } = require('./constantesValidacion');



module.exports = async (idEmployee,{ personaRepository},{empleadoRepository }) => {


console.log('xxxDOCUMENTO ID EMPLEADO_:',idEmployee);
let  empleadoDTO = null;
  try {
     
    const empleado = await empleadoRepository.getById(idEmployee);
   
    if(empleado!=null && empleado.id){

    const persona =  await  personaRepository.get(empleado.idPerson);
     empleadoDTO = new EmpleadoDTO(persona,empleado);
  
    }else{
        empleadoDTO = new EmpleadoDTO(null,empleado);
        empleadoDTO.setError(EMPLEADO_NO_ENCONTRADO);
   }
   
  

} catch (error) {
   console.log('Error:',error);
   empleadoDTO = new EmpleadoDTO(null,null);
   empleadoDTO.setError(ERROR_TECNICO+':'+error);
   
}
return empleadoDTO;
};
