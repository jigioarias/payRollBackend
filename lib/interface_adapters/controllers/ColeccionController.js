'use strict';

const Boom = require('@hapi/boom');
const ResponseSerializer = require('../serializers/ResponseSerializer');

const ColeccionRepository = require('../../application_business_rules/repositories/ColeccionRepository');
const Response = require('../../application_business_rules/use_cases/Response');
const ColeccionRepositorySQL = require('../storage/ColeccionRepositoryMYSQL');
const CreateColeccion = require('../../application_business_rules/use_cases/CreateColeccion');
const ListColeccion = require('../../application_business_rules/use_cases/ListColeccion');
const coleccionRepository = new ColeccionRepository(new ColeccionRepositorySQL());


module.exports = {

  async create(request) {
  
    const coleccion = await CreateColeccion( request.payload,{ coleccionRepository });

   // Output
    const response =new Response(coleccion,'OK','');
    const responseSerializer = new ResponseSerializer();
    return responseSerializer.serialize(response);
  },


  async list(request) {

    const enterprise = request.payload.enterprise;

    const colecciones = await ListColeccion(enterprise,{ coleccionRepository });

    // Output
    const response =new Response(colecciones,'OK','');
    const responseSerializer = new ResponseSerializer();
    return responseSerializer.serialize(response);
  
  },
  
};

