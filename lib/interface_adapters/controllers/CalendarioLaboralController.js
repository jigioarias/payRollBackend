'use strict';

const Boom = require('@hapi/boom');
const ResponseSerializer = require('../serializers/ResponseSerializer');

const ListClaseNominas = require('../../application_business_rules/use_cases/ListClaseNominas');
const getFechasCalendarioLaboral = require('../../application_business_rules/use_cases/getFechasCalendarioLaboral');
const Response = require('../../application_business_rules/use_cases/Response');


const CalendarioLaboralRepository = require('../../application_business_rules/repositories/CalendarioLaboralRepository');
const CalendarioLaboralRepositorySQL = require('../storage/CalendarioLaboralRepositoryMYSQL');
const calendarioLaboralRepository = new CalendarioLaboralRepository(new CalendarioLaboralRepositorySQL());


module.exports = {

  async getFechasCalendarioLaboral(request) {

       // Treatment

    console.log(request.payload);   
    const fechas = await getFechasCalendarioLaboral( request.payload.fechaInicioLaboral.enterprise, request.payload.fechaInicioLaboral.calendar, request.payload.fechaInicioLaboral.date,request.payload.fechaFinLaboral.date,{ calendarioLaboralRepository });



    // Output
    const response =new Response(fechas,'OK','');
    const responseSerializer = new ResponseSerializer();
    return responseSerializer.serialize(response);
  },

 

};

