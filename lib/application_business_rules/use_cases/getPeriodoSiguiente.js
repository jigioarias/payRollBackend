'use strict';

const  PeriodClase = require('../../enterprise_business_rules/entities/PeriodoClase');

const {PERIODOS,MES_NOVIEMBRE,MES_ENERO} =require('./constantesPeriodo')

module.exports =async ( period,clase, { periodClaseRepository }) => {

try {
  


let periodos =PERIODOS;

 let periodoConsulta = null;
 let yearNew = 0;
 let monthNew = 0;

 periodos.forEach(typeperiodoSearching => {
   
  
  if (clase.periodType==typeperiodoSearching.periodType){
    
    
  typeperiodoSearching.periods.forEach(periodoSearching => {
    
    if(period.period==periodoSearching.period){
      monthNew = parseInt(period.month);
      yearNew = parseInt(period.year);

      if(monthNew >MES_NOVIEMBRE && periodoSearching.last){
        yearNew = yearNew+1;
      }

      if(periodoSearching.last){
          
          if(monthNew <= MES_NOVIEMBRE){
            monthNew = monthNew+1;
          }else{
            monthNew = MES_ENERO;
          }
      }
     
      
      periodoConsulta = new PeriodClase(null, clase.enterprise, clase.id, periodoSearching.periodNext,yearNew+'', period.active,null,(monthNew <10 )?'0'+monthNew:monthNew,null,null);
    }

  });
 }

});
  
//console.log(periodoConsulta);

if (periodoConsulta != null){
   let periodretorno =  await periodClaseRepository.findByPeriod(periodoConsulta);
   return periodretorno;
}

return null;
} catch (error) {
  console.log(error);
  return null; 
}
};
