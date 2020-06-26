'use strict';

const Boom = require('@hapi/boom');
const ResponseSerializer = require('../serializers/ResponseSerializer');

const ListSemanaLaboral = require('../../application_business_rules/use_cases/ListSemanaLaboral');
const Response = require('../../application_business_rules/use_cases/Response');


const SemanaLaboralRepository = require('../../application_business_rules/repositories/SemanaLaboralRepository');
const SemanaLaboralRepositorySQL = require('../storage/SemanaLaboralRepositoryMYSQL');
const semanaLaboralRepository = new SemanaLaboralRepository(new SemanaLaboralRepositorySQL());


module.exports = {

  

  async find() {

    // Treatment
    const listaSemanas = await ListSemanaLaboral({ semanaLaboralRepository });

    // Output
    const response =new Response(listaSemanas,'OK','');
    const responseSerializer = new ResponseSerializer();
    return responseSerializer.serialize(response);
  
  },


};

