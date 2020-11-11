'use strict';


const IncapacidadDTO = require('../../application_business_rules/use_cases/IncapacidadDTO');

module.exports = async (incapacidadRequest,{incapacidadRepository},{personaRepository}) => {


  
  try {
     

    let lista = null;
    if(incapacidadRequest.registerPeriod!=null){
      console.log('Lista de periodo');
       lista = await incapacidadRepository.list(incapacidadRequest);
    }else if(incapacidadRequest.document!=null &&  incapacidadRequest.document!=""){
      console.log('Lista de empleado');
      lista = await incapacidadRepository.findByDocument(incapacidadRequest);
    }else if(incapacidadRequest.clase !=null && incapacidadRequest.clase >0){
      console.log('Lista de listByClassPayRoll');
      lista = await incapacidadRepository.listByClassPayRoll(incapacidadRequest); 
    }else
      {
        console.log('Lista de empresa');
        lista = await incapacidadRepository.listByEnterprise(incapacidadRequest); 
     
    }  
    


    
    let listIncapacidad =[];
    let persona = null;
    
    
    for (let index = 0; index < lista.length; index++) {
      const element = lista[index];
      persona =  await  personaRepository.getByDocument(element.document);
      listIncapacidad.push(new IncapacidadDTO(persona,element));
      
    }
    return listIncapacidad;
     
} catch (error) {
   console.log('Error:',error);
   return null;
}
   
};
