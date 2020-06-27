'use strict';

const Empleado = require('../../enterprise_business_rules/entities/Empleado');
const Persona = require('../../enterprise_business_rules/entities/Persona');
const EmpleadoDTO = require('../../application_business_rules/use_cases/EmpleadoDTO');
const semanalaboral = require('../../frameworks_drivers/webserver/semanalaboral');
const CalendarioLaboral = require('../../frameworks_drivers/database/models/CalendarioLaboral');
const PreatacionSocial = require('../../enterprise_business_rules/entities/PrestacionSocial');
const PrestacionesSociales = require('../../frameworks_drivers/database/models/PrestacionesSociales');


module.exports = async (enterprise,document,active,{ personaRepository},{empleadoRepository },{claseNominaRepository},{periodClaseRepository},{semanaLaboralRepository},{calendarioLaboralRepository},{prestacionSocialRepository}) => {


  
  try {
   
    const persona =  await  personaRepository.getByDocument(document);
    const empleado = await empleadoRepository.getByIdPerson(persona.id,active);
    const classPayRoll = await  claseNominaRepository.get(empleado.classPayRoll);    
    const periodo = await periodClaseRepository.findByClassPayRoll(enterprise,classPayRoll.id,active);
    const semanaLaboral = await semanaLaboralRepository.get(classPayRoll.workweek);
    
    const idCalendar = semanaLaboral.workcalendar;
    const calendarioLaboral = await calendarioLaboralRepository.get(idCalendar);
    
    const prestacionSocial = new PreatacionSocial (null, enterprise,null, null, document,  null,null,null,null,null,null,'DIAS_VACACIONES',null,'N');

    const diasVacaciones = await prestacionSocialRepository.findByEmpleadoPeriod(prestacionSocial);
    let  empleadoDTO = new EmpleadoDTO(persona,empleado);
    empleadoDTO.setClassPayRoll(classPayRoll);
    empleadoDTO.setPeriod(periodo);
    empleadoDTO.setWorkWeek(semanaLaboral);
    empleadoDTO.setCalendarWork(calendarioLaboral);    
    empleadoDTO.setVacationDays(diasVacaciones.totalVacaciones);


  
    return empleadoDTO;
  
  

 
} catch (error) {
   console.log('Error:',error);
   return null;
}
   
};
