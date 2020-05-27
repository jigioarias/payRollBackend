'use strict';

const Boom = require('@hapi/boom');
const ResponseSerializer = require('../serializers/ResponseSerializer');

const ListaCentroCostos = require('../../application_business_rules/use_cases/ListCentroCostos');
const CreateCentroCostos = require('../../application_business_rules/use_cases/CreateCentroCostos');
//const GetUser = require('../../application_business_rules/use_cases/GetUser');
//const DeleteUser = require('../../application_business_rules/use_cases/DeleteUser');
const CentroCostosRepository = require('../../application_business_rules/repositories/CentroCostosRepository');
const Response = require('../../application_business_rules/use_cases/Response');


//const UserRepositoryInMemory = require('../storage/UserRepositoryInMemory');

const CentroCostosRepositorySQL = require('../storage/CentroCostosRepositorySQLite');

const centroCostosRepository = new CentroCostosRepository(new CentroCostosRepositorySQL());

/*
const UserRepositorySQLite = require('../storage/UserRepositorySQLite');
const userRepository = new UserRepository(new UserRepositorySQLite());
*/

module.exports = {

  async createCentroCostos(request) {

    // Input
    const {  enterprise, code, description,active,user,branchOffice } = request.payload;
   
    // Treatment
   const centroCostos = await CreateCentroCostos( enterprise, code,  description,active,user,branchOffice, { centroCostosRepository });
    
    
    const response =new Response(centroCostos,'OK','');
    const responseSerializer = new ResponseSerializer();
    return responseSerializer.serialize(response);
  },

  async findCentroCostos() {

    // Treatment
    const areas = await ListaCentroCostos({ centroCostosRepository });

    // Output
    const response =new Response(areas,'OK','');
    const responseSerializer = new ResponseSerializer();
    return responseSerializer.serialize(response);
  
  },

  /*
  async getArea(request) {

    // Input
    const centroCostosId = request.params.id;

    // Treatment
    const area = await GetUser(centroCostosId, { CentroCostosRepository });

    // Output
    if (!area) {
      return Boom.notFound();
    }
    const CentroCostosSerializer = new CentroCostosSerializer();
    return CentroCostosSerializer.serialize(area);
  },

  async deleteArea(request, h) {

    // Input
    const areaId = request.params.id;

    // Treatment
    await DeleteUser(areaId, { CentroCostosRepository });

    // Output
    return h.response().code(204);
  },
   */

};

