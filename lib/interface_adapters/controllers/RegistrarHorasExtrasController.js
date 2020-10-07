    'use strict';

const Boom = require('@hapi/boom');
const ResponseSerializer = require('../serializers/ResponseSerializer');
const Response = require('../../application_business_rules/use_cases/Response');

const ExtraHoursRules = require('../../application_business_rules/use_cases/ExtraHoursRules');




const CreateNovedadNominaEmpleado = require('../../application_business_rules/use_cases/CreateNovedadNominaEmpleado');
const CreateHorasExtrasEmpleado = require('../../application_business_rules/use_cases/CreateHorasExtrasEmpleado');


const NovedadNominaRepository = require('../../application_business_rules/repositories/NovedadNominaRepository');
const NovedadNominaRepositoryMySQL = require('../storage/NovedadNominaRepositoryMYSQL');
const novedadNominaRepository = new NovedadNominaRepository(new NovedadNominaRepositoryMySQL());

const HorasExtrasRepository = require('../../application_business_rules/repositories/HorasExtrasRepository');
const HorasExtrasRepositoryMySQL = require('../storage/HorasExtrasRepositoryMYSQL');
const horasExtrasRepository = new HorasExtrasRepository(new HorasExtrasRepositoryMySQL());

const {TIPO_AJUSTE_SUMA,NOVEDAD_APROBADA} =require('./constantesSistema')


module.exports = {
    
  async ingresar(request) {

    let response = null;
    const responseSerializer = new ResponseSerializer();
    let novedadHorasExtras =  null;
    let horasExtrasRegistro = null;
    

    
    try {

    const  cumpleValidaciones =ExtraHoursRules.validate(request.payload.employee,
                              request.payload.idClassPayRoll,request.payload.period,
                              request.payload.concept,request.payload.hours,
                              request.payload.valor,request.payload.noveltyDate);

      if(cumpleValidaciones ==null){
        horasExtrasRegistro  = await CreateHorasExtrasEmpleado(
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
          request.payload.noveltyDate,
          {horasExtrasRepository}
);

       if(horasExtrasRegistro.id !=null){   
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
       
      }
     response = new Response(horasExtrasRegistro,'OK', '');
      return responseSerializer.serialize(response);
      }else{
        response = new Response(cumpleValidaciones,'Error', cumpleValidaciones);
        return responseSerializer.serialize(response);
      }
    } catch (err) {
      response = new Response(null, 'Error', err);
      return responseSerializer.serialize(response);
    }


  },




};
