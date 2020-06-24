'use strict';

const Empleado = require('../../enterprise_business_rules/entities/Empleado');
const Persona = require('../../enterprise_business_rules/entities/Persona');
const EmpleadoDTO = require('../../application_business_rules/use_cases/EmpleadoDTO');


module.exports = async (enterprise,document,active,{ personaRepository},{empleadoRepository },{claseNominaRepository},{periodClaseRepository}) => {


  
  try {
   
    console.log('active',active);
    const persona =  await  personaRepository.getByDocument(document);
    const empleado = await empleadoRepository.getByIdPerson(persona.id,active);
    const classPayRoll = await  claseNominaRepository.get(empleado.classPayRoll);    
    const periodo = await periodClaseRepository.findByClassPayRoll(enterprise,classPayRoll.id,active);
    let  empleadoDTO = new EmpleadoDTO(persona,empleado);
    empleadoDTO.setClassPayRoll(classPayRoll);
    empleadoDTO.setPeriod(periodo);
  
    return empleadoDTO;
  
  

 
} catch (error) {
   console.log('Error:',error);
   return null;
}
   
};
