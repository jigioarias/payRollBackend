'use strict';
const NovedadNomina = require('../../enterprise_business_rules/entities/NovedadNomina');
const Licencia = require('../../enterprise_business_rules/entities/Licencia');
const Nomina = require('../../enterprise_business_rules/entities/Nomina');


module.exports = async (enterprise,employeeId,document,year,period,clase,initDate,endDate,active, { licenciaRepository}) => {

  try {

   
   
   const licenciaEntity = new Licencia(null, enterprise, document, initDate, endDate,null, null,null,employeeId,year,null,clase,null,active);

   const listaLicencias =  await licenciaRepository.find(licenciaEntity);


   let yearLicenciaInicial =null;
   let monthLicenciaInicial = null;
   let dayLicenciaInicial = null;
   let fechaLicenciaInicial = null;

   let yearLicenciaPeriodo =null;
   let monthLicenciaPeriodo = null;
   let dayLicenciaPeriodo = null;
   let fechaLicenciaPeriodo = null;
   let datoFechaInicial= null;


   let yearLicenciaFinal =null;
   let monthLicenciaFinal = null;
   let dayLicenciaFinal = null;
   let fechaLicenciaFinal = null;

   
   let yearLicenciaPeriodoFinal =null;
   let monthLicenciaPeriodoFinal = null;
   let dayLicenciaPeriodoFinal = null;
   let fechaLicenciaPeriodoFinal = null;
   let datoFechaFinal= null;
   let restaDias = 0;

   listaLicencias.forEach(licencia => {
       
          datoFechaInicial = licencia.initDate; 
          datoFechaFinal = licencia.endDate;


          yearLicenciaInicial = datoFechaInicial.getFullYear();
          monthLicenciaInicial = datoFechaInicial.getUTCMonth();
          dayLicenciaInicial = datoFechaInicial.getUTCDate();
           fechaLicenciaInicial = new Date(yearLicenciaInicial,monthLicenciaInicial,dayLicenciaInicial); 
           
           yearLicenciaFinal = datoFechaFinal.getFullYear();
           monthLicenciaFinal = datoFechaFinal.getUTCMonth();
           dayLicenciaFinal = datoFechaFinal.getUTCDate();
           fechaLicenciaFinal = new Date(yearLicenciaFinal,monthLicenciaFinal,dayLicenciaFinal); 

           
           yearLicenciaPeriodo =initDate.substring(0,4);
           monthLicenciaPeriodo = initDate.substring(5,7);
           dayLicenciaPeriodo = initDate.substring(8,10);
           //console.log('year periodo',yearLicenciaPeriodo,monthLicenciaPeriodo,dayLicenciaPeriodo);
           fechaLicenciaPeriodo = new Date(yearLicenciaPeriodo,(parseInt(monthLicenciaPeriodo)-1),dayLicenciaPeriodo); 
           
   
           yearLicenciaPeriodoFinal =endDate.substring(0,4);
           monthLicenciaPeriodoFinal = endDate.substring(5,7);
           dayLicenciaPeriodoFinal = endDate.substring(8,10);
           //console.log('year periodo',yearLicenciaPeriodo,monthLicenciaPeriodo,dayLicenciaPeriodo);
           fechaLicenciaPeriodoFinal = new Date(yearLicenciaPeriodoFinal,(parseInt(monthLicenciaPeriodoFinal)-1),dayLicenciaPeriodoFinal);

          // console.log('Fecha periodo Inicial',fechaLicenciaInicial,fechaLicenciaPeriodo,datoFechaInicial);
          // console.log('Fecha periodo Final',fechaLicenciaFinal,fechaLicenciaPeriodoFinal,datoFechaFinal);

           if(fechaLicenciaInicial >= fechaLicenciaPeriodo ){
              if(fechaLicenciaPeriodoFinal <= fechaLicenciaFinal){
                      //console.log('fecha final mayor o igual');
                      restaDias= fechaLicenciaPeriodoFinal -  ((fechaLicenciaInicial<fechaLicenciaPeriodo)?fechaLicenciaPeriodo:fechaLicenciaInicial);
                    }else{
                     // console.log('fecha final menor',fechaLicenciaFinal);
                      //console.log('TODO inactivar licencia');

                      restaDias = fechaLicenciaFinal -  ((fechaLicenciaInicial<fechaLicenciaPeriodo)?fechaLicenciaPeriodo:fechaLicenciaInicial);
                      //TODO inactivar licencia
                    }

                   restaDias = (restaDias/(1000*60*60*24 ))+1; 
          }else{
              if(fechaLicenciaFinal >=fechaLicenciaPeriodo && fechaLicenciaFinal<= fechaLicenciaPeriodoFinal){
            
              restaDias =  ((fechaLicenciaFinal -fechaLicenciaPeriodo)/(1000*60*60*24 ))+1; 
              //TODO inactivar vacion
             // console.log('TODO inactivar licencia fecha inicio menor');
             }else{
                if(fechaLicenciaFinal >= fechaLicenciaPeriodo){
                  restaDias = ((fechaLicenciaPeriodoFinal -fechaLicenciaPeriodo)/(1000*60*60*24 ))+1;
                }
              }


          }
            

          

   });   

     return restaDias;


  } catch (error) {
    console.log(error);
    return null;    
  }



};
