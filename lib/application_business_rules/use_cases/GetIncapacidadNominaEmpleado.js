'use strict';
const Incapacidad = require('../../enterprise_business_rules/entities/Incapacidad');


module.exports = async (enterprise,employeeId,document,year,period,clase,initDate,endDate,active, { incapacidadRepository}) => {

  try {

   
   
   const incapacidadEntity = new Incapacidad(null, enterprise, document, initDate, endDate,null,null,employeeId,year,null,clase,null,active,null);

   const listaIncapacidads =  await incapacidadRepository.find(incapacidadEntity);


   let yearIncapacidadInicial =null;
   let monthIncapacidadInicial = null;
   let dayIncapacidadInicial = null;
   let fechaIncapacidadInicial = null;

   let yearIncapacidadPeriodo =null;
   let monthIncapacidadPeriodo = null;
   let dayIncapacidadPeriodo = null;
   let fechaIncapacidadPeriodo = null;
   let datoFechaInicial= null;


   let yearIncapacidadFinal =null;
   let monthIncapacidadFinal = null;
   let dayIncapacidadFinal = null;
   let fechaIncapacidadFinal = null;

   
   let yearIncapacidadPeriodoFinal =null;
   let monthIncapacidadPeriodoFinal = null;
   let dayIncapacidadPeriodoFinal = null;
   let fechaIncapacidadPeriodoFinal = null;
   let datoFechaFinal= null;
   let restaDias = 0;

   listaIncapacidads.forEach(incapacidad => {
       
          datoFechaInicial = incapacidad.initDate; 
          datoFechaFinal = incapacidad.endDate;


          yearIncapacidadInicial = datoFechaInicial.getFullYear();
          monthIncapacidadInicial = datoFechaInicial.getUTCMonth();
          dayIncapacidadInicial = datoFechaInicial.getUTCDate();
           fechaIncapacidadInicial = new Date(yearIncapacidadInicial,monthIncapacidadInicial,dayIncapacidadInicial); 
           
           yearIncapacidadFinal = datoFechaFinal.getFullYear();
           monthIncapacidadFinal = datoFechaFinal.getUTCMonth();
           dayIncapacidadFinal = datoFechaFinal.getUTCDate();
           fechaIncapacidadFinal = new Date(yearIncapacidadFinal,monthIncapacidadFinal,dayIncapacidadFinal); 

           
           yearIncapacidadPeriodo =initDate.substring(0,4);
           monthIncapacidadPeriodo = initDate.substring(5,7);
           dayIncapacidadPeriodo = initDate.substring(8,10);
           //console.log('year periodo',yearIncapacidadPeriodo,monthIncapacidadPeriodo,dayIncapacidadPeriodo);
           fechaIncapacidadPeriodo = new Date(yearIncapacidadPeriodo,(parseInt(monthIncapacidadPeriodo)-1),dayIncapacidadPeriodo); 
           
   
           yearIncapacidadPeriodoFinal =endDate.substring(0,4);
           monthIncapacidadPeriodoFinal = endDate.substring(5,7);
           dayIncapacidadPeriodoFinal = endDate.substring(8,10);
           //console.log('year periodo',yearIncapacidadPeriodo,monthIncapacidadPeriodo,dayIncapacidadPeriodo);
           fechaIncapacidadPeriodoFinal = new Date(yearIncapacidadPeriodoFinal,(parseInt(monthIncapacidadPeriodoFinal)-1),dayIncapacidadPeriodoFinal);

          // console.log('Fecha periodo Inicial',fechaIncapacidadInicial,fechaIncapacidadPeriodo,datoFechaInicial);
          // console.log('Fecha periodo Final',fechaIncapacidadFinal,fechaIncapacidadPeriodoFinal,datoFechaFinal);

           if(fechaIncapacidadInicial >= fechaIncapacidadPeriodo ){
              if(fechaIncapacidadPeriodoFinal <= fechaIncapacidadFinal){
                      //console.log('fecha final mayor o igual');
                      restaDias= fechaIncapacidadPeriodoFinal -  ((fechaIncapacidadInicial<fechaIncapacidadPeriodo)?fechaIncapacidadPeriodo:fechaIncapacidadInicial);
                    }else{
                     // console.log('fecha final menor',fechaIncapacidadFinal);
                      //console.log('TODO inactivar incapacidad');

                      restaDias = fechaIncapacidadFinal -  ((fechaIncapacidadInicial<fechaIncapacidadPeriodo)?fechaIncapacidadPeriodo:fechaIncapacidadInicial);
                      //TODO inactivar incapacidad
                    }

                   restaDias = (restaDias/(1000*60*60*24 ))+1; 
          }else{
              if(fechaIncapacidadFinal >=fechaIncapacidadPeriodo && fechaIncapacidadFinal<= fechaIncapacidadPeriodoFinal){
            
              restaDias =  ((fechaIncapacidadFinal -fechaIncapacidadPeriodo)/(1000*60*60*24 ))+1; 
              //TODO inactivar vacion
             // console.log('TODO inactivar incapacidad fecha inicio menor');
             }else{
                if(fechaIncapacidadFinal >= fechaIncapacidadPeriodo){
                  restaDias = ((fechaIncapacidadPeriodoFinal -fechaIncapacidadPeriodo)/(1000*60*60*24 ))+1;
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
