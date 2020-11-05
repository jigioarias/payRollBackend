'use strict';


const LicenciaDTO = require('../../application_business_rules/use_cases/LicenciaDTO');

module.exports = async (licenciaRequest,{licenciaRepository},{personaRepository}) => {


  
  try {
    let lista = null;
    if(licenciaRequest.registerPeriod!=null){
      console.log('Lista de periodo');

       lista = await licenciaRepository.list(licenciaRequest);
    }else if(licenciaRequest.employeeId !=null){
      console.log('Lista de empleado');
      lista = await licenciaRepository.findByDocument(licenciaRequest);
    }else if(licenciaRequest.clase !=null){
      console.log('Lista de listByClassPayRoll');
      lista = await licenciaRepository.listByClassPayRoll(licenciaRequest); 
    }else
      {
        console.log('Lista de empresa');
        lista = await licenciaRepository.listByEnterprise(licenciaRequest); 
     
    }  
    
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
