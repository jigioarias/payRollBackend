'use strict';

const Boom = require('@hapi/boom');
const ResponseSerializer = require('../serializers/ResponseSerializer');
const ListPeriodClase = require('../../application_business_rules/use_cases/ListPeriodosClase');
const CreatePeriodoClase = require('../../application_business_rules/use_cases/CreatePeriodoClase');
const ListPeriodosPorClase = require('../../application_business_rules/use_cases/ListPeriodosPorClase');
const GetPeriodoSiguiente = require('../../application_business_rules/use_cases/getPeriodoSiguiente');


const Response = require('../../application_business_rules/use_cases/Response');

const PeriodoClaseRepository = require('../../application_business_rules/repositories/PeriodoClaseRepository');
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
                                                request.payload.month,
                                                request.payload.initDate,
                                                request.payload.endDate,
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


  async findPeriodosPorClase(request) {

    // Treatment
    const periodoCLase = await ListPeriodosPorClase(request.payload.enterprise,request.payload.classPayRoll.id,request.payload.active,{ periodClaseRepository });

    // Output
    const response =new Response(periodoCLase,'OK','');
    const responseSerializer = new ResponseSerializer();
    return responseSerializer.serialize(response);
  
  },

  async findPeriodoSiguiente(request) {

    // Treatment
    const periodoCLase = await GetPeriodoSiguiente(request.payload.period,request.payload.classPayRoll,{ periodClaseRepository });

    // Output
    const response =new Response(periodoCLase,'OK','');
    const responseSerializer = new ResponseSerializer();
    return responseSerializer.serialize(response);
  
  },

};

