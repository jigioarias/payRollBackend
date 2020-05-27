'use strict';

const Boom = require('@hapi/boom');
const SucursalSerializer = require('../serializers/SucursalSerializer');
const ResponseSerializer = require('../serializers/ResponseSerializer');

const ListSucursals = require('../../application_business_rules/use_cases/ListSucursales');
const CreateSucursal = require('../../application_business_rules/use_cases/CreateSucursal');
//const GetUser = require('../../application_business_rules/use_cases/GetUser');
//const DeleteUser = require('../../application_business_rules/use_cases/DeleteUser');
const SucursalRepository = require('../../application_business_rules/repositories/SucursalRepository');
const Response = require('../../application_business_rules/use_cases/Response');


//const UserRepositoryInMemory = require('../storage/UserRepositoryInMemory');

const SucursalRepositorySQL = require('../storage/SucursalRepositorySQLite');

const sucursalRepository = new SucursalRepository(new SucursalRepositorySQL());

/*
const UserRepositorySQLite = require('../storage/UserRepositorySQLite');
const userRepository = new UserRepository(new UserRepositorySQLite());
*/


module.exports = {

  async createSucursal(request) {

    // Input
    const {  enterprise, code, address, description,phone,active,user } = request.payload;

    // Treatment
    const sucursal = await CreateSucursal( enterprise, code, address, description,phone,active,user, { sucursalRepository });

    // Output
    const sucursalSerializer = new SucursalSerializer();
    return sucursalSerializer.serialize(sucursal);
  },

  async findSucursals() {

    // Treatment
    const sucursals = await ListSucursals({ sucursalRepository });

    // Output
    const sucursalSerializer = new SucursalSerializer();
    const response =new Response(sucursals.map(sucursalSerializer.serialize),'OK','');
    const responseSerializer = new ResponseSerializer();
    return responseSerializer.serialize(response);
  
  },

  /*
  async getSucursal(request) {

    // Input
    const userId = request.params.id;

    // Treatment
    const Sucursal = await GetUser(userId, { sucursalRepository });

    // Output
    if (!Sucursal) {
      return Boom.notFound();
    }
    const SucursalSerializer = new SucursalSerializer();
    return SucursalSerializer.serialize(Sucursal);
  },

  async deleteSucursal(request, h) {

    // Input
    const SucursalId = request.params.id;

    // Treatment
    await DeleteUser(SucursalId, { sucursalRepository });

    // Output
    return h.response().code(204);
  },
   */

};

