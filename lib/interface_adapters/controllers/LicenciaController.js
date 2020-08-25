'use strict';

const Boom = require('@hapi/boom');
const ResponseSerializer = require('../serializers/ResponseSerializer');

const ListLicencias = require('../../application_business_rules/use_cases/ListLicencias');

const Response = require('../../application_business_rules/use_cases/Response');

const LicenciaRepository = require('../../application_business_rules/repositories/LicenciaRepository');
const LicenciaRepositoryMySQL = require('../storage/LicenciaRepositoryMYSQL');
const licenciaRepository = new LicenciaRepository(new LicenciaRepositoryMySQL());

const PersonaRepository = require('../../application_business_rules/repositories/PersonaRepository');
const PersonaRepositorySQL = require('../storage/PersonaRepositoryMYSQL');
const personaRepository = new PersonaRepository(new PersonaRepositorySQL());


module.exports = {


  async list(request) {

    // Input
    console.log(request.payload);
    // Treatment
    const lista = await ListLicencias( request.payload, { licenciaRepository },{personaRepository});
    // Output
    const response =new Response(lista,'OK','');
    const responseSerializer = new ResponseSerializer();
    return responseSerializer.serialize(response);
  },


};

