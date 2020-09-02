'use strict';


const IncapacidadDTO = require('../../application_business_rules/use_cases/IncapacidadDTO');

module.exports = async (incapacidadRequest,{incapacidadRepository},{personaRepository}) => {


  
  try {
     

    const lista = await incapacidadRepository.list(incapacidadRequest);

    
    let listIncapacidad =[];
    let persona = null;
    
    
    console.log('Lista de incapacidades',lista);
    for (let index = 0; index < lista.length; index++) {
      const element = lista[index];
      persona =  await  personaRepository.getByDocument(element.document);
      listIncapacidad.push(new IncapacidadDTO(persona,element));
      
    }
    console.log('lista incapacidads Persona',listIncapacidad);
    return listIncapacidad;
     
} catch (error) {
   console.log('Error:',error);
   return null;
}
   
};
