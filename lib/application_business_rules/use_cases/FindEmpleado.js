'use strict';

const PreatacionSocial = require('../../enterprise_business_rules/entities/PrestacionSocial');
const EmpleadoDTO = require('../../application_business_rules/use_cases/EmpleadoDTO');
const { ERROR_TECNICO, EMPLEADO_NO_ENCONTRADO } = require('./constantesValidacion');



module.exports = async (document, enterprise, active, { personaRepository }, { empleadoRepository },
   { claseNominaRepository }, { prestacionSocialRepository },
   { periodoClaseRepository }, { semanaLaboralRepository },
   { calendarioLaboralRepository }) => {


   let empleadoDTO = null;
   try {


      const persona = await personaRepository.getByDocument(document);

      const empleado = await empleadoRepository.getByIdPerson(persona.id);

      if (empleado != null && empleado.id) {
         
         empleadoDTO = new EmpleadoDTO(persona, empleado);
         const classPayRoll = await claseNominaRepository.get(empleado.classPayRoll);
         const periodo = await periodoClaseRepository.findByClassPayRoll(enterprise, classPayRoll.id, active);
         const semanaLaboral = await semanaLaboralRepository.get(classPayRoll.workweek);
         const idCalendar = semanaLaboral.workcalendar;
         const prestacionSocial = new PreatacionSocial(null, enterprise, null, null, document, null, null, null, null, null, null, 'DIAS_VACACIONES', null, 'N');
         const diasVacaciones = await prestacionSocialRepository.findByEmpleadoPeriod(prestacionSocial);
         const calendarioLaboral = await calendarioLaboralRepository.get(idCalendar);
         empleadoDTO.setClassPayRoll(classPayRoll);
         empleadoDTO.setPeriod(periodo);
         empleadoDTO.setWorkWeek(semanaLaboral);
         empleadoDTO.setCalendarWork(calendarioLaboral);
         empleadoDTO.setVacationDays(diasVacaciones.totalVacaciones);

      } else {

         empleadoDTO = new EmpleadoDTO(null, empleado);
         empleadoDTO.setError(EMPLEADO_NO_ENCONTRADO);
      }



   } catch (error) {
      console.log('Error:', error);
      empleadoDTO = new EmpleadoDTO(null, null);
      empleadoDTO.setError(ERROR_TECNICO + ':' + error);

   }
   return empleadoDTO;
};
