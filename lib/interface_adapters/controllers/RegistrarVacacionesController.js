    'use strict';

const Boom = require('@hapi/boom');
const ResponseSerializer = require('../serializers/ResponseSerializer');
const Response = require('../../application_business_rules/use_cases/Response');



const CreateNovedadNominaEmpleado = require('../../application_business_rules/use_cases/CreateNovedadNominaEmpleado');
const ListParametroDescripcion = require('../../application_business_rules/use_cases/ListParametroDescripcion');



const ParametroRepository = require('../../application_business_rules/repositories/ParametroRepository');
const ParametroRepositorySQL = require('../storage/ParametroRepositoryMYSQL');
const parametroRepository = new ParametroRepository(new ParametroRepositorySQL());



const NovedadNominaRepository = require('../../application_business_rules/repositories/NovedadNominaRepository');
const NovedadNominaRepositoryMySQL = require('../storage/NovedadNominaRepositoryMYSQL');
const novedadNominaRepository = new NovedadNominaRepository(new NovedadNominaRepositoryMySQL());




module.exports = {
  async ingresar(request) {

    let response = null;
    const responseSerializer = new ResponseSerializer();
    let novedadDiasEnDinero =  null;

    try {


     
      
      if(request.payload.moneyDays)  {
      
      let conceptoDiasVacaciones = await ListParametroDescripcion(request.payload.enterprise,'conceptoDiasVacionesRemuneradas',{parametroRepository});
      console.log(conceptoDiasVacaciones.value);


        novedadDiasEnDinero = await CreateNovedadNominaEmpleado(
        request.payload.enterprise,
        request.payload.clase,
        request.payload.employee,
        request.payload.document,
        conceptoDiasVacaciones.value,
        request.payload.period.period,
        1000,
        200, 
        request.payload.period.initDate,
        request.payload.period.endDate,
        request.payload.user,
        'S',
        {novedadNominaRepository});
      
      }

      
     response = new Response(novedadDiasEnDinero,'OK', '');
      return responseSerializer.serialize(response);

    } catch (err) {
      console.log('errrrooorr',err);
      response = new Response(null, 'Error', err);
      return responseSerializer.serialize(response);
    }


  },




};
