'use strict';

const SolicitudVacacionDTO = require('../../application_business_rules/use_cases/SolicitudVacacionDTO');


module.exports = async (vacationRequest,{solicitudVacacionRepository},{personaRepository}) => {


  
  try {
     

    const lista = await solicitudVacacionRepository.list(vacationRequest);

    
    let listSolicitud =[];
    let persona = null;
    let empleado = null;
    
    console.log('Lista de solicitudes',lista);
    for (let index = 0; index < lista.length; index++) {
      const element = lista[index];
      persona =  await  personaRepository.getByDocument(element.document);
        
         listSolicitud.push(new SolicitudVacacionDTO(persona,element));
      
    }

    console.log('lista solicitud Persona',listSolicitud);
    return listSolicitud;
  
  

 
} catch (error) {
   console.log('Error:',error);
   return null;
}
   
};
