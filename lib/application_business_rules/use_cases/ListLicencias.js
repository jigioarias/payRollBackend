'use strict';


const LicenciaDTO = require('../../application_business_rules/use_cases/LicenciaDTO');

module.exports = async (vacationRequest,{licenciaRepository},{personaRepository}) => {


  
  try {
     

    const lista = await licenciaRepository.list(vacationRequest);

    
    let listLicencia =[];
    let persona = null;
    
    
    console.log('Lista de licencias',lista);
    for (let index = 0; index < lista.length; index++) {
      const element = lista[index];
      persona =  await  personaRepository.getByDocument(element.document);
      listLicencia.push(new LicenciaDTO(persona,element));
      
    }
    console.log('lista licencias Persona',listLicencia);
    return listLicencia;
     
} catch (error) {
   console.log('Error:',error);
   return null;
}
   
};
