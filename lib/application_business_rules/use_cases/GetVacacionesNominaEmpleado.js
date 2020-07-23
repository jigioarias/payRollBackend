'use strict';
const NovedadNomina = require('../../enterprise_business_rules/entities/NovedadNomina');
const Nomina = require('../../enterprise_business_rules/entities/Nomina');


module.exports = async (enterprise,employeeId,document,year,period,clase,initDate,endDate, { vacacionRepository}) => {

  try {

   
//   const novedadNomina = new NovedadNomina(null,enterprise,clase,employeeId,null,null,period,null,null,null,null,null,null); 
   
   
   const listaVacaciones =  await vacacionRepository.find(enterprise, employeeId, year, clase,true);

   let yearVacacionInicial =null;
   let monthVacacioInicial = null;
   let dayVacacionInicial = null;
   let fechaVacacionInicial = null;

   let yearVacacionPeriodo =null;
   let monthVacacioPeriodo = null;
   let dayVacacionPeriodo = null;
   let fechaVacacionPeriodo = null;
   let datoFechaInicial= null;


   let yearVacacionFinal =null;
   let monthVacacioFinal = null;
   let dayVacacionFinal = null;
   let fechaVacacionFinal = null;

   
   let yearVacacionPeriodoFinal =null;
   let monthVacacioPeriodoFinal = null;
   let dayVacacionPeriodoFinal = null;
   let fechaVacacionPeriodoFinal = null;
   let datoFechaFinal= null;
   let restaDias = 0;

   listaVacaciones.forEach(vacacion => {
       
          datoFechaInicial = vacacion.enjoyInitDate; 
          datoFechaFinal = vacacion.enjoyEndDate;


          yearVacacionInicial = datoFechaInicial.getFullYear();
          monthVacacioInicial = datoFechaInicial.getUTCMonth();
          dayVacacionInicial = datoFechaInicial.getUTCDate();
           fechaVacacionInicial = new Date(yearVacacionInicial,monthVacacioInicial,dayVacacionInicial); 
           
           yearVacacionFinal = datoFechaFinal.getFullYear();
           monthVacacioFinal = datoFechaFinal.getUTCMonth();
           dayVacacionFinal = datoFechaFinal.getUTCDate();
           fechaVacacionFinal = new Date(yearVacacionFinal,monthVacacioFinal,dayVacacionFinal); 

           
           yearVacacionPeriodo =initDate.substring(0,4);
           monthVacacioPeriodo = initDate.substring(5,7);
           dayVacacionPeriodo = initDate.substring(8,10);
           //console.log('year periodo',yearVacacionPeriodo,monthVacacioPeriodo,dayVacacionPeriodo);
           fechaVacacionPeriodo = new Date(yearVacacionPeriodo,(parseInt(monthVacacioPeriodo)-1),dayVacacionPeriodo); 
           
   
           yearVacacionPeriodoFinal =endDate.substring(0,4);
           monthVacacioPeriodoFinal = endDate.substring(5,7);
           dayVacacionPeriodoFinal = endDate.substring(8,10);
           //console.log('year periodo',yearVacacionPeriodo,monthVacacioPeriodo,dayVacacionPeriodo);
           fechaVacacionPeriodoFinal = new Date(yearVacacionPeriodoFinal,(parseInt(monthVacacioPeriodoFinal)-1),dayVacacionPeriodoFinal);

           console.log('Fecha periodo Inicial',fechaVacacionInicial,fechaVacacionPeriodo,datoFechaInicial);
           console.log('Fecha periodo Final',fechaVacacionFinal,fechaVacacionPeriodoFinal,datoFechaFinal);

           if(fechaVacacionInicial >= fechaVacacionPeriodo ){
              if(fechaVacacionPeriodoFinal <= fechaVacacionFinal){
                      console.log('fecha final mayor o igual');
                      restaDias= fechaVacacionPeriodoFinal -  ((fechaVacacionInicial<fechaVacacionPeriodo)?fechaVacacionPeriodo:fechaVacacionInicial);
                    }else{
                      console.log('fecha final menor',fechaVacacionFinal);
                      console.log('TODO inactivar vacacion');

                      restaDias = fechaVacacionFinal -  ((fechaVacacionInicial<fechaVacacionPeriodo)?fechaVacacionPeriodo:fechaVacacionInicial);
                      //TODO inactivar vacacion
                    }

                   restaDias = (restaDias/(1000*60*60*24 ))+1; 
          }else{
              if(fechaVacacionFinal >=fechaVacacionPeriodo && fechaVacacionFinal<= fechaVacacionPeriodoFinal){
            
              restaDias =  ((fechaVacacionFinal -fechaVacacionPeriodo)/(1000*60*60*24 ))+1; 
              //TODO inactivar vacion
              console.log('TODO inactivar vacacion fecha inicio menor');
             }else{
                if(fechaVacacionFinal >= fechaVacacionPeriodo){
                  restaDias = ((fechaVacacionPeriodoFinal -fechaVacacionPeriodo)/(1000*60*60*24 ))+1;
                }
              }


          }
          console.log('Resta de Dias>>>>>>',restaDias);       

          

   });   


   //  return lista;

  // buscar vacaciones persona


  


/*  mominaRegistro = new Nomina(
    null,
    empresaId,
    empleado.employee.id,
    empleado.person.document,
    empleado.person.firstName + ' '+ empleado.person.lastName,
    empleado.person.address,
    empleado.person.email,
    empleado.person.phone,
    periodValue,
    salario,
    salarioMensual,
    salarioTotal,
    fechaInicioPeriodo,
    fechaFinPeriodo,
    'P',
    dias,
    user,
    );

*/




  } catch (error) {
    console.log(error);
    return null;    
  }



};
