'use strict';

const  PeriodClase = require('../../enterprise_business_rules/entities/PeriodoClase');

module.exports = async (enterprise, clase, period, year,active,user,month,initDate,endDate, { periodClaseRepository }) => {
  
  
  const periodc = new PeriodClase(null, enterprise, clase, period,year, active,user,month,initDate,endDate,);
 
 
     const  periodo = await periodClaseRepository.persist(periodc);

      return periodo;

    
  
};
