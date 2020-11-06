'use strict';
const NovedadNomina = require('../../enterprise_business_rules/entities/NovedadNomina');
const Licencia = require('../../enterprise_business_rules/entities/Licencia');
const HoraLicenciaDTO = require('../../application_business_rules/use_cases/HoraLicenciaDTO');



module.exports = async (enterprise,employeeId,document,year,period,clase,initDate,endDate,state, { licenciaRepository}) => {

  try {

   
   
   const licenciaEntity = new Licencia(null, enterprise, document, initDate, endDate,null, null,null,employeeId,year,null,clase,null,state,0);
   
   const listaLicencias =  await licenciaRepository.find(licenciaEntity);

   let horasRemuneradas =0;
   let horasNoRemuneradas = 0;

   listaLicencias.forEach(licencia => {
      // console.log(licencia);
    if(licencia.remuneration ==1){     
      horasRemuneradas = horasRemuneradas +licencia.hours;
    }else{
      horasNoRemuneradas = horasNoRemuneradas + licencia.hours;
    }
      
       

   });   
    // console.log('horasssssss',horasRemuneradas,horasNoRemuneradas);
     return new HoraLicenciaDTO(horasRemuneradas,horasNoRemuneradas);

  } catch (error) {
    console.log(error);
    return null;    
  }



};
