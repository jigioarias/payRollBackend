'use strict';

const Boom = require('@hapi/boom');
const ResponseSerializer = require('../serializers/ResponseSerializer');
const ListPeriodClase = require('../../application_business_rules/use_cases/ListPeriodosClase');
const CreatePeriodoClase = require('../../application_business_rules/use_cases/CreatePeriodoClase');
const PeriodoClaseRepository = require('../../application_business_rules/repositories/PeriodoClaseRepository');
const Response = require('../../application_business_rules/use_cases/Response');
const PeriodoClaseRepositorySQL = require('../storage/PeriodoClaseRepositoryMYSQL');
const periodClaseRepository = new PeriodoClaseRepository(new PeriodoClaseRepositorySQL());


module.exports = {

  async createPeriodoClase(request) {

    // Treatment
    const periodoClase = await CreatePeriodoClase( request.payload.enterprise, 
                                                    request.payload.clase, 
                                                     request.payload.period,
                                                request.payload.year,
                                                request.payload.active, 
                                                request.payload.user,
                                                { periodClaseRepository });

    // Output
    const response =new Response(periodoClase,'OK','');
    const responseSerializer = new ResponseSerializer();
    return responseSerializer.serialize(response);
  },

  async findCPeriodosClase() {

    // Treatment
    const periodoCLase = await ListPeriodClase({ periodClaseRepository });

    // Output
    const response =new Response(periodoCLase,'OK','');
    const responseSerializer = new ResponseSerializer();
    return responseSerializer.serialize(response);
  
  },


};
