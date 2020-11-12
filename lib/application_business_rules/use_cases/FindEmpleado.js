'use strict';

const Empleado = require('../../enterprise_business_rules/entities/Empleado');
const Persona = require('../../enterprise_business_rules/entities/Persona');
const EmpleadoDTO = require('../../application_business_rules/use_cases/EmpleadoDTO');
const { ERROR_TECNICO, EMPLEADO_NO_ENCONTRADO } = require('./constantesValidacion');



module.exports = async (document,{ personaRepository},{empleadoRepository },{claseNominaRepository}) => {


let  empleadoDTO = null;
  try {
     

   const persona =  await  personaRepository.getByDocument(document);

   const empleado = await empleadoRepository.getByIdPerson(persona.id);
   
    if(empleado!=null && empleado.id){
       const classPayRoll = await  claseNominaRepository.get(empleado.classPayRoll);    

      empleadoDTO = new EmpleadoDTO(persona,empleado);
      empleadoDTO.setClassPayRoll(classPayRoll);

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
