'use strict';

const Boom = require('@hapi/boom');
const ResponseSerializer = require('../serializers/ResponseSerializer');
const ListPeriodClase = require('../../application_business_rules/use_cases/ListPeriodosClase');
const CreatePeriodoClase = require('../../application_business_rules/use_cases/CreatePeriodoClase');
const ListPeriodosPorClase = require('../../application_business_rules/use_cases/ListPeriodosPorClase');
const GetPeriodoSiguiente = require('../../application_business_rules/use_cases/getPeriodoSiguiente');


const Response = require('../../application_business_rules/use_cases/Response');
const { PERIODO_CLASE_NO_EXISTE } = require('../../application_business_rules/use_cases/constantesValidacion');

const PeriodoClaseRepository = require('../../application_business_rules/repositories/PeriodoClaseRepository');
const PeriodoClaseRepositorySQL = require('../storage/PeriodoClaseRepositoryMYSQL');
const GetPeriodoClase = require('../../application_business_rules/use_cases/GetPeriodoClase');
const UpdatePeriodoClase = require('../../application_business_rules/use_cases/UpdatePeriodoClase');
const periodoClaseRepository = new PeriodoClaseRepository(new PeriodoClaseRepositorySQL());


module.exports = {

  async create(request) {

    let response =null;
    let responseSerializer = null;
    try {
      
  
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
                                                { periodoClaseRepository });

    // Output
     response =new Response(periodoClase,'OK','');
     responseSerializer = new ResponseSerializer();

  } catch (error) {
     response =new Response(null,'ERROR',error);
     responseSerializer = new ResponseSerializer();
      
  }
  return responseSerializer.serialize(response);

  },

  async find(request) {

    // Treatment
    const periodoCLase = await ListPeriodClase(request.payload.enterprise,{periodoClaseRepository});

    // Output
    const response =new Response(periodoCLase,'OK','');
    const responseSerializer = new ResponseSerializer();
    return responseSerializer.serialize(response);
  
  },


  async findPeriodosPorClase(request) {

    // Treatment
    const periodoCLase = await ListPeriodosPorClase(request.payload.enterprise,request.payload.classPayRoll.id,request.payload.active,{ periodoClaseRepository });

    // Output
    const response =new Response(periodoCLase,'OK','');
    const responseSerializer = new ResponseSerializer();
    return responseSerializer.serialize(response);
  
  },

  async findPeriodoSiguiente(request) {

    // Treatment
    const periodoCLase = await GetPeriodoSiguiente(request.payload.period,request.payload.classPayRoll,{ periodoClaseRepository });

    // Output
    const response =new Response(periodoCLase,'OK','');
    const responseSerializer = new ResponseSerializer();
    return responseSerializer.serialize(response);
  
  },

  async update(request) {

    let response =null;
    let responseSerializer = null;
    try {
      
  
    // Treatment
    const periodoClase = await UpdatePeriodoClase( request.payload.id,request.payload.enterprise, 
                                                    request.payload.clase, 
                                                     request.payload.period,
                                                request.payload.year,
                                                request.payload.active, 
                                                request.payload.user,
                                                request.payload.month,
                                                request.payload.initDate,
                                                request.payload.endDate,
                                                { periodoClaseRepository });

    // Output
     response =new Response(periodoClase,'OK','');
     responseSerializer = new ResponseSerializer();

  } catch (error) {
     response =new Response(null,'ERROR',error);
     responseSerializer = new ResponseSerializer();
      
  }
  return responseSerializer.serialize(response);

  },

  async get(request) {

    let response = null;
    let responseSerializer = null;
  try {
  
    const id = request.params.id;
    // Treatment
    const periodo = await GetPeriodoClase(id, { periodoClaseRepository });

    // Output
    if (!periodo) {
      response =new Response(periodo,'OK',PERIODO_CLASE_NO_EXISTE);
      responseSerializer = new ResponseSerializer();      
    }else{
        // Output
         response =new Response(periodo,'OK','');
         responseSerializer = new ResponseSerializer();
    }
  } catch (error) {
  
  }
  return responseSerializer.serialize(response);

  },
};

