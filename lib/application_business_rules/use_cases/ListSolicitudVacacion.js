'use strict';

const SolicitudVacacionDTO = require('../../application_business_rules/use_cases/SolicitudVacacionDTO');


module.exports = async (vacationRequest,{solicitudVacacionRepository},{personaRepository}) => {


  
  try {
     

    const lista = await solicitudVacacionRepository.list(vacationRequest);
    let listSolicitud =[];
    let persona = null;
    
    for (let index = 0; index < lista.length; index++) {
      const element = lista[index];
      persona =  await  personaRepository.getByDocument(element.document);
        
         listSolicitud.push(new SolicitudVacacionDTO(persona,element));
      
    }

    return listSolicitud;
  
  

 
} catch (error) {
   console.log('Error:',error);
   return null;
}
   
};
