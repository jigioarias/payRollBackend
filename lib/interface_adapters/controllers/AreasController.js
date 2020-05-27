'use strict';

const Boom = require('@hapi/boom');
const AreaSerializer = require('../serializers/AreaSerializer');
const ResponseSerializer = require('../serializers/ResponseSerializer');

const ListAreas = require('../../application_business_rules/use_cases/ListAreas');
const CreateArea = require('../../application_business_rules/use_cases/CreateArea');
//const GetUser = require('../../application_business_rules/use_cases/GetUser');
//const DeleteUser = require('../../application_business_rules/use_cases/DeleteUser');
const AreaRepository = require('../../application_business_rules/repositories/AreaRepository');
const Response = require('../../application_business_rules/use_cases/Response');


//const UserRepositoryInMemory = require('../storage/UserRepositoryInMemory');

const AreaRepositorySQL = require('../storage/AreaRepositorySQLite');

const areaRepository = new AreaRepository(new AreaRepositorySQL());

/*
const UserRepositorySQLite = require('../storage/UserRepositorySQLite');
const userRepository = new UserRepository(new UserRepositorySQLite());
*/

module.exports = {

  async createArea(request) {

    // Input
    const {  enterprise, code, unity, description,active,user } = request.payload;

    // Treatment
    const area = await CreateArea( enterprise, code, unity, description,active,user, { areaRepository });

    // Output
    const areaSerializer = new AreaSerializer();
    return areaSerializer.serialize(area);
  },

  async findAreas() {

    // Treatment
    const areas = await ListAreas({ areaRepository });

    // Output
    const areaSerializer = new AreaSerializer();
    const response =new Response(areas.map(areaSerializer.serialize),'OK','');
    const responseSerializer = new ResponseSerializer();
    return responseSerializer.serialize(response);
  
  },

  /*
  async getArea(request) {

    // Input
    const userId = request.params.id;

    // Treatment
    const area = await GetUser(userId, { areaRepository });

    // Output
    if (!area) {
      return Boom.notFound();
    }
    const areaSerializer = new AreaSerializer();
    return areaSerializer.serialize(area);
  },

  async deleteArea(request, h) {

    // Input
    const areaId = request.params.id;

    // Treatment
    await DeleteUser(areaId, { areaRepository });

    // Output
    return h.response().code(204);
  },
   */

};

