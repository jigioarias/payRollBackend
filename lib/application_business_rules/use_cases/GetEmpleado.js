'use strict';

const Empleado = require('../../enterprise_business_rules/entities/Empleado');
const Persona = require('../../enterprise_business_rules/entities/Persona');
const EmpleadoDTO = require('../../application_business_rules/use_cases/EmpleadoDTO');
const semanalaboral = require('../../frameworks_drivers/webserver/semanalaboral');
const PreatacionSocial = require('../../enterprise_business_rules/entities/PrestacionSocial');
const PrestacionesSociales = require('../../frameworks_drivers/database/models/PrestacionesSociales');
const CalendarioLaboral = require('../../enterprise_business_rules/entities/CalendarioLaboral');



module.exports = async (enterprise,document,active,{ personaRepository},{empleadoRepository },{claseNominaRepository},{periodoClaseRepository},{semanaLaboralRepository},
                      {calendarioLaboralRepository},{prestacionSocialRepository},{solicitudVacacionRepository}) => {


console.log('xxxDOCUMENTO ID EMPLEADO_:',document);

  try {
     
    const persona =  await  personaRepository.getByDocument(document);
    const solicitudVacacion = await solicitudVacacionRepository.find(enterprise,document,'P');
    if(solicitudVacacion!=null){

    const empleado = await empleadoRepository.getByIdPerson(persona.id,active);
    const classPayRoll = await  claseNominaRepository.get(empleado.classPayRoll);    
    
    const periodo = await periodoClaseRepository.findByClassPayRoll(enterprise,classPayRoll.id,active);

    const semanaLaboral = await semanaLaboralRepository.get(classPayRoll.workweek);
    const idCalendar = semanaLaboral.workcalendar;
    const prestacionSocial = new PreatacionSocial (null, enterprise,null, null, document,  null,null,null,null,null,null,'DIAS_VACACIONES',null,'N');
    const diasVacaciones = await prestacionSocialRepository.findByEmpleadoPeriod(prestacionSocial); 
    const calendario = new CalendarioLaboral(idCalendar,enterprise,null,null,null); 

    
    const fechaInicial  =  new Date(solicitudVacacion.enjoyInitDate);
    const fechaFinal =  new Date(solicitudVacacion.enjoyEndDate);
    let restaDias = ((fechaFinal.getTime()- fechaInicial.getTime())/(1000*60*60*24 ))+1;
    const diasFestivosFinesDeSemana = await calendarioLaboralRepository.getDaysRangeDate(calendario,solicitudVacacion.enjoyInitDate,solicitudVacacion.enjoyEndDate)
    const solicitudDias = restaDias + diasFestivosFinesDeSemana.dias;
    const calendarioLaboral = await calendarioLaboralRepository.get(idCalendar);
    

    let  empleadoDTO = new EmpleadoDTO(persona,empleado);
    empleadoDTO.setClassPayRoll(classPayRoll);
    empleadoDTO.setPeriod(periodo);
    empleadoDTO.setWorkWeek(semanaLaboral);
    empleadoDTO.setCalendarWork(calendarioLaboral);    
    empleadoDTO.setVacationDays(diasVacaciones.totalVacaciones);
    empleadoDTO.setVacationRequest(solicitudVacacion);
    empleadoDTO.setRequestDays(solicitudDias);


  
    return empleadoDTO;
    
   }
   
  return null;
 
} catch (error) {
   console.log('Error:',error);
   return null;
}
   
};
