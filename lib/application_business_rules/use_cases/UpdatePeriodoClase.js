'use strict';

const  PeriodClase = require('../../enterprise_business_rules/entities/PeriodoClase');
const PeriodoClaseRules = require('../../application_business_rules/use_cases/PeriodoClaseRules');
const {ERROR_TECNICO} =require('./constantesValidacion');
const PeriodoClaseDTO = require('../../application_business_rules/use_cases/PeriodoClaseDTO');

module.exports = async (id,enterprise, clase, period, year,active,user,month,initDate,endDate, { periodoClaseRepository }) => {
  
   

  let periodoClasec = null;
  let mensajeValidacionPeriodoClase = null;
  let periodoClaseDTO = null;
   try {
  
        const periodoClase = 
        new PeriodClase(id, enterprise, clase, period,year, active,user,month,initDate,endDate);
        mensajeValidacionPeriodoClase = PeriodoClaseRules.validateCreate(periodoClase);
      console.log(mensajeValidacionPeriodoClase); 

      if (mensajeValidacionPeriodoClase == null){
        periodoClasec = await periodoClaseRepository.merge(periodoClase);
        periodoClaseDTO = new PeriodoClaseDTO(periodoClasec);

        } else{
          periodoClaseDTO = new PeriodoClaseDTO(periodoClasec);
          periodoClaseDTO.setError(mensajeValidacionPeriodoClase);
        }  

} catch (error) {
  console.log(error);
  periodoClaseDTO = new PeriodoClaseDTO(null);
  periodoClaseDTO.setError(ERROR_TECNICO+':'+error); 
}
return periodoClaseDTO;

  
};
