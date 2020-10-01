    'use strict';

const Boom = require('@hapi/boom');
const ResponseSerializer = require('../serializers/ResponseSerializer');
const Response = require('../../application_business_rules/use_cases/Response');



const CreateNovedadNominaEmpleado = require('../../application_business_rules/use_cases/CreateNovedadNominaEmpleado');


const NovedadNominaRepository = require('../../application_business_rules/repositories/NovedadNominaRepository');
const NovedadNominaRepositoryMySQL = require('../storage/NovedadNominaRepositoryMYSQL');
const novedadNominaRepository = new NovedadNominaRepository(new NovedadNominaRepositoryMySQL());


const {TIPO_AJUSTE_SUMA,NOVEDAD_APROBADA} =require('./constantesSistema')


module.exports = {
    
  async ingresar(request) {

    let response = null;
    const responseSerializer = new ResponseSerializer();
    let novedadHorasExtras =  null;

    
    try {

        novedadHorasExtras = await CreateNovedadNominaEmpleado(
                                                               request.payload.enterprise,
                                                               request.payload.idClassPayRoll,
                                                               request.payload.employee,
                                                               request.payload.document,
                                                               request.payload.concept,
                                                               request.payload.period,
                                                               request.payload.valor,
                                                               request.payload.hours, 
                                                               request.payload.initDate,
                                                               request.payload.endDate,
                                                               request.payload.user,
                                                               TIPO_AJUSTE_SUMA,
                                                               NOVEDAD_APROBADA,
                                                               {novedadNominaRepository}
         );
       
   
     response = new Response(novedadHorasExtras,'OK', '');
      return responseSerializer.serialize(response);

    } catch (err) {
      console.log('errrrooorr',err);
      response = new Response(null, 'Error', err);
      return responseSerializer.serialize(response);
    }


  },




};
