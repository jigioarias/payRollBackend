'use strict';


const HorasExtrasDTO = require('../../application_business_rules/use_cases/horasExtrasDTO');

module.exports = async (horasExtrasRequest,{horasExtrasRepository},{personaRepository},{conceptoRepository}) => {

    let listHorasExtras =[];
    let persona = null;
    let concepto  = null;
    let horasExtrasDTO = null;
    
  
  try {
     

    
    let lista = null;
    if(horasExtrasRequest.period!=null){
      console.log('Lista de periodo');
       lista = await horasExtrasRepository.list(horasExtrasRequest);
    }else if(horasExtrasRequest.document!=null &&  horasExtrasRequest.document!=""){
      console.log('Lista de empleado');
      lista = await horasExtrasRepository.findByDocument(horasExtrasRequest);
    }else if(horasExtrasRequest.clase !=null && horasExtrasRequest.clase >0){
      console.log('Lista de listByClassPayRoll');
      lista = await horasExtrasRepository.listByClassPayRoll(horasExtrasRequest); 
    }else
      {
        console.log('Lista de empresa');
        lista = await horasExtrasRepository.listByEnterprise(horasExtrasRequest); 
     
    }  
    
    for (let index = 0; index < lista.length; index++) {
      const element = lista[index];
      persona =  await  personaRepository.getByDocument(element.document);
      concepto = await conceptoRepository.get(element.concept);
      horasExtrasDTO =new HorasExtrasDTO(persona,element);
      horasExtrasDTO.setConcept(concepto);
      listHorasExtras.push(horasExtrasDTO);
      
    }
    return listHorasExtras;
     
} catch (error) {
   console.log('Error:',error);
   return null;
}
   
};
