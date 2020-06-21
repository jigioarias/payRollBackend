'use strict';

const PreatacionSocial = require('../../enterprise_business_rules/entities/PrestacionSocial');
const nomina = require('../../frameworks_drivers/webserver/nomina');


module.exports = async( listaNominaDTO,tipoNomina, { prestacionSocialRepository }) => {
  
try {
    


 
 
  let listaConceptosCesantias = [9999];
  let listaConceptosPrima = [9999];
  let listaConceptosVacaciones = [0];
  let diasCensantias = 0.0833 /30;
  let diasVacaciones = 0.0417 /30;
  let diasPrima = 0.0833 /30;
  let porcentajeIntereses = 0.01/30;
  let valorCesantias = 0;
  let valorPrima=0;
  let valorIntereses=0;
  let valorVacaciones = 0;
  let prestacionCesantias = null;
  let prestacionVacaciones =null;
  let prestacionIntereses = null;
  let prestacionPrima = null;
  let guardoPrestacionVacacion = null;
  let guardoPrestacionIntereses = null;
  let guardoPrestacionPrima =null;
  let guardoPrestacionCesantias = null;
  
    for(let nominaDTO of listaNominaDTO){
        let valorPrestacionCesantias =0;
        let valorPrestacionVacaciones = 0;
        let valorPrestacionesPrima =0;
        for(let  detalle of nominaDTO.payRollDetail){

            valorPrestacionCesantias =0;
            for(let concepto  of listaConceptosCesantias){
                              
                            
                                if(detalle.concept == concepto){
                                        console.log('concepto',detalle.concept);
                                        console.log('valor',detalle.valor);
                                        valorPrestacionCesantias = valorPrestacionCesantias + detalle.valor;    
                                        
                                }
                        }

            console.log('aux+salario',(valorPrestacionCesantias+nominaDTO.payRoll.monthSalary))
            valorCesantias = (valorPrestacionCesantias+nominaDTO.payRoll.monthSalary)*(diasCensantias*nominaDTO.payRoll.days);
             valorIntereses = (valorCesantias)*(porcentajeIntereses*nominaDTO.payRoll.days);
       
          valorPrestacionVacaciones =0;
          for(let concepto  of listaConceptosVacaciones){
                            
                          
                              if(detalle.concept == concepto){
                               valorPrestacionVacaciones = valorPrestacionVacaciones + detalle.valor;    
                                      
                              }
            }

          
           valorVacaciones = (valorPrestacionVacaciones+nominaDTO.payRoll.monthSalary)*(diasVacaciones*nominaDTO.payRoll.days);

          valorPrestacionesPrima =0;
          for(let concepto  of listaConceptosPrima){
                            
                          
                              if(detalle.concept == concepto){
                               valorPrestacionesPrima = valorPrestacionesPrima + detalle.valor;    
                                      
                              }
            }

          
           valorPrima = (valorPrestacionesPrima+nominaDTO.payRoll.monthSalary)*(diasPrima*nominaDTO.payRoll.days);
        }
        
        prestacionVacaciones = new PreatacionSocial(null, nominaDTO.payRoll.enterprise,
                                                  nominaDTO.payRoll.clase, nominaDTO.payRoll.employeeId,
                                                  nominaDTO.payRoll.document, nominaDTO.payRoll.period,
                                                  valorVacaciones,nominaDTO.payRoll.monthSalary,
                                                  nominaDTO.payRoll.salary,nominaDTO.payRoll.InitDayPay,
                                                  nominaDTO.payRoll.endDayPay,'VACACIONES',
                                                  nominaDTO.payRoll.user);
       guardoPrestacionVacacion = await prestacionSocialRepository.persist(prestacionVacaciones);

       prestacionPrima = new PreatacionSocial(null, nominaDTO.payRoll.enterprise,nominaDTO.payRoll.clase, nominaDTO.payRoll.employeeId, 
                                              nominaDTO.payRoll.document,nominaDTO.payRoll.period,valorPrima,nominaDTO.payRoll.monthSalary,
            nominaDTO.payRoll.salary,nominaDTO.payRoll.InitDayPay,nominaDTO.payRoll.endDayPay,'PRIMA',nominaDTO.payRoll.user);
         guardoPrestacionPrima = await prestacionSocialRepository.persist(prestacionPrima);

       prestacionIntereses = new PreatacionSocial(null, nominaDTO.payRoll.enterprise,nominaDTO.payRoll.clase, nominaDTO.payRoll.employeeId,
                                                 nominaDTO.payRoll.document, nominaDTO.payRoll.period,valorIntereses,nominaDTO.payRoll.monthSalary,
            nominaDTO.payRoll.salary,nominaDTO.payRoll.InitDayPay,nominaDTO.payRoll.endDayPay,'INTERESES_CESANTIAS',nominaDTO.payRoll.user);
         guardoPrestacionIntereses =await prestacionSocialRepository.persist(prestacionIntereses);
    
          prestacionCesantias = new PreatacionSocial(null, nominaDTO.payRoll.enterprise,nominaDTO.payRoll.clase, nominaDTO.payRoll.employeeId, 
            nominaDTO.payRoll.document,nominaDTO.payRoll.period,valorCesantias,nominaDTO.payRoll.monthSalary,
                nominaDTO.payRoll.salary,nominaDTO.payRoll.InitDayPay,nominaDTO.payRoll.endDayPay,'CESANTIAS',nominaDTO.payRoll.user);
         guardoPrestacionCesantias = await prestacionSocialRepository.persist(prestacionCesantias);
      

    }
    


 return 'OK';
} catch (error) {
    console.log(error);
    return null;   
}
  
};
