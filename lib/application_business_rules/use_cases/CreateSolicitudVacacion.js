'use strict';

const Licencia = require('../../enterprise_business_rules/entities/Licencia');
const Incapacidad = require('../../enterprise_business_rules/entities/Incapacidad');
const ValidateNovedadesEmpleado = require('../../application_business_rules/use_cases/ValidateNovedadesEmpleado');



module.exports = async (vacationRequest,{solicitudVacacionRepository},
                        {personaRepository},{empleadoRepository},
                        {vacacionRepository},{licenciaRepository},{incapacidadRepository}) => {


  
  try {
     
    let active = true;
    const idEmpresa = vacationRequest.enterprise;
    const documento =vacationRequest.document;
    const persona =  await  personaRepository.getByDocument(documento);
    const empleado = await empleadoRepository.getByIdPerson(persona.id,active);
    let solicitudVacacion = null;
    
    let ano =vacationRequest.enjoyInitDate.substring(0,4);
    const fechaInicialSolicitud  =  new Date(vacationRequest.enjoyInitDate);
    const fechaFinalSolicitud =  new Date(vacationRequest.enjoyEndDate);
 
    const existeNovedad = await ValidateNovedadesEmpleado(idEmpresa,empleado,documento,active,ano,fechaInicialSolicitud,fechaFinalSolicitud,{vacacionRepository},{licenciaRepository},{incapacidadRepository});
   
    if(!existeNovedad){
        
         solicitudVacacion = solicitudVacacionRepository.persist(vacationRequest);  
    }


return solicitudVacacion;
  

 
} catch (error) {
   console.log('Error:',error);
   return null;
}
   
};
