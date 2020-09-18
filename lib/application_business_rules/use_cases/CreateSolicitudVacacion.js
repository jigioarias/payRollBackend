'use strict';



module.exports = async (vacationRequest,{solicitudVacacionRepository}) => {


  
  try {
     
    
    const persona =  await  personaRepository.getByDocument(vacationRequest.document);
    const empleado = await empleadoRepository.getByIdPerson(persona.id,active);
    let ano =vacationRequest.enjoyInitDate.substring(0,4);
    const fechaInicialSolicitud  =  new Date(vacationRequest.enjoyInitDate);
    const fechaFinalSolicitud =  new Date(vacationRequest.enjoyEndDate);
    const fechaInicialVacacion  =  new Date(vacationRequest.enjoyInitDate);
    const fechaFinalVacacion =  new Date(vacationRequest.enjoyEndDate);
    const listaVacaciones =  await vacacionRepository.find(vacationRequest.enterprise, empleado.id, ano, empleado.classPayRoll,true);
    let existeVacaciones = false;    
    let vacacion = null;
    let active = true;

    let solicitudVacacion = null;


    for (let index = 0; index < listaVacaciones.length && !existeVacaciones; index++) {
         vacacion = listaVacaciones[index];
         fechaInicialVacacion = vacacion.enjoyInitDate;
         fechaFinalVacacion = vacacion.enjoyEndDate;

         if((fechaInicialVacacion<=fechaInicialSolicitud && fechaInicialSolicitud<=fechaFinalVacacion)
            || (fechaInicialVacacion<=fechaFinalSolicitud && fechaFinalSolicitud<=fechaFinalVacacion)){
                existeVacaciones = true;
            }

    }

//licencias
if(!existeVacaciones) 
const licenciaEntity = new Licencia(null, vacationRequest.enterprise, vacationRequest.document, null, null,null, null,null,empleado.id,ano,null,empleado.classPayRoll,null,active);
const listaLicencias =  await licenciaRepository.find(licenciaEntity);

let licencia = null;
for (let index = 0; index < listaLicencias.length && !existeVacaciones; index++) {

  licencia = listaLicencias[index];

  fechaInicialVacacion = licencia.initDate;
  fechaFinalVacacion = licencia.endDate;

  if((fechaInicialVacacion<=fechaInicialSolicitud && fechaInicialSolicitud<=fechaFinalVacacion)
     || (fechaInicialVacacion<=fechaFinalSolicitud && fechaFinalSolicitud<=fechaFinalVacacion)){
         existeVacaciones = true;
     }
  
}
 

const incapacidadEntity = new Incapacidad(null, vacationRequest.enterprise, vacationRequest.document, null, null,null,null,empleado.id,ano,null,empleado.classPayRoll,null,active,null);
const listaIncapacidads =  await incapacidadRepository.find(incapacidadEntity);

let incapacidad = null;
for (let index = 0; index < listaIncapacidads.length && !existeVacaciones; index++) {

  incapacidad = listaIncapacidads[index];

  fechaInicialVacacion = incapacidad.initDate;
  fechaFinalVacacion = incapacidad.endDate;

  if((fechaInicialVacacion<=fechaInicialSolicitud && fechaInicialSolicitud<=fechaFinalVacacion)
     || (fechaInicialVacacion<=fechaFinalSolicitud && fechaFinalSolicitud<=fechaFinalVacacion)){
         existeVacaciones = true;
     }
  
    }

if(!existeVacaciones){
         solicitudVacacion = solicitudVacacionRepository.persist(vacationRequest);
}
    
    return solicitudVacacion;
  
  

 
} catch (error) {
   console.log('Error:',error);
   return null;
}
   
};
