    'use strict';

const Boom = require('@hapi/boom');
const ResponseSerializer = require('../serializers/ResponseSerializer');
const ListEmpleadosClaseNomina = require('../../application_business_rules/use_cases/ListEmpleadosClaseNomina');
const ListConceptoClaseNomina = require('../../application_business_rules/use_cases/ListConceptoClaseNomina');
const Response = require('../../application_business_rules/use_cases/Response');
const Fecha  = require('../../enterprise_business_rules/entities/Fecha');


const ConceptoNominaRepository = require('../../application_business_rules/repositories/ConcepNominaRepository');
const ConceptoNominaRepositorySQL = require('../storage/ConceptoNominaRepositoryMYSQL');
const conceptoNominaRepository = new ConceptoNominaRepository(new ConceptoNominaRepositorySQL());

const EmpleadoRepository = require('../../application_business_rules/repositories/EmpleadoRepository');
const EmpleadoRepositoryMySQL = require('../storage/EmpleadoRepositoryMYSQL');
const empleadoRepository = new EmpleadoRepository(new EmpleadoRepositoryMySQL());






module.exports = {
  async createNomina(request) {

    let response = null;
    const responseSerializer = new ResponseSerializer();

    try {


      let empleados = await ListEmpleadosClaseNomina(request.payload.enterprise,request.payload.active,request.payload.classPayRoll.id, { empleadoRepository });
      let conceptosNominaBasicos = await ListConceptoClaseNomina(request.payload.enterprise,request.payload.classPayRoll.id,request.payload.active, { conceptoNominaRepository });
      

      let resta = 0;
      let menorFechaInicioContrato = false;
      let menorFechaFinContrato = false;
      let menorFechaPeriodo = false;
      
      let menorFFPyFCC = false;

      let fechaInicioPeriodo = new Date(request.payload.period.initDate);
      let fechaFinPeriodo = new Date(request.payload.period.endDate);
      let fechaInicioContrato = null;
      let fechaFinContrato = null;


      empleados.forEach(empleado => {
         fechaInicioContrato =  new Date(empleado.initDateContract);
         fechaFinContrato = new Date(empleado.endDateContract);
         console.log(fechaInicioContrato);
         console.log(fechaFinContrato);
        // restaa = Fecha.restar(fechaInicioContrato,fechaInicioPeriodo);
         menorFechaInicioContrato = Fecha.menorIgualQue(fechaInicioContrato,fechaInicioPeriodo);
         menorFechaFinContrato = Fecha.menorIgualQue(fechaFinContrato,fechaInicioPeriodo);
        
         console.log(!menorFechaFinContrato);
        if(menorFechaFinContrato == false){
          console.log('entro');

          if( menorFechaInicioContrato){

            menorFechaPeriodo =  Fecha.menorIgualQue(fechaFinPeriodo,fechaFinContrato);
            if(menorFechaPeriodo){
               resta = Fecha.restar(fechaInicioPeriodo,fechaFinPeriodo); 
            }else{
              resta = Fecha.restar(fechaInicioPeriodo,fechaFinContrato); 

            }
          }else{

              menorFFPyFCC = Fecha.menorIgualQue(fechaFinPeriodo,fechaFinContrato);
              if(menorFFPyFCC){
                resta = Fecha.restar(fechaInicioContrato,fechaFinPeriodo);
              }else{
                resta = (Fecha.restar(fechaFinContrato,fechaFinPeriodo)-Fecha.restar(fechaInicioPeriodo,fechaInicioContrato))+1;
              }
          }

        }else{
          resta = 0;
        }
        console.log('resta>>>>', resta );
        console.log('menor FI>>>>', menorFechaInicioContrato );
        console.log('mayor FF>>>>', menorFechaInicioContrato );

        
      });
      
     

     

      
         
      response = new Response(empleados, 'OK', '');
      return responseSerializer.serialize(response);

    } catch (err) {
      console.log('Error>>>>>>>>',err);
      response = new Response(null, 'Error', err);
      return responseSerializer.serialize(response);
    }


  },




};
