'use strict';

const Boom = require('@hapi/boom');
const UserSerializer = require('../serializers/UserSerializer');
const ListUsers = require('../../application_business_rules/use_cases/ListUsers');
const CreateUser = require('../../application_business_rules/use_cases/CreateUser');
const GetUser = require('../../application_business_rules/use_cases/GetUser');
const DeleteUser = require('../../application_business_rules/use_cases/DeleteUser');
const UserRepository = require('../../application_business_rules/repositories/UserRepository');

//const UserRepositoryInMemory = require('../storage/UserRepositoryInMemory');

const UserRepositorySQLite = require('../storage/UserRepositorySQLite');

const userRepository = new UserRepository(new UserRepositorySQLite());

/*
const UserRepositorySQLite = require('../storage/UserRepositorySQLite');
const userRepository = new UserRepository(new UserRepositorySQLite());
*/

module.exports = {

  async createUser(request) {

    // Input
    const { firstName, lastName, email, password,user,enterprise,otro } = request.payload;

    // Treatment
    const userc = await CreateUser(firstName, lastName, email, password,user,enterprise,otro, { userRepository });

    // Output
    const userSerializer = new UserSerializer();
    return userSerializer.serialize(userc);
  },

  async findUsers() {

    // Treatment
    const users = await ListUsers({ userRepository });

    // Output
    const userSerializer = new UserSerializer();
    return users.map(userSerializer.serialize)
  },

  async getUser(request) {

    // Input
    const userId = request.params.id;

    // Treatment
    const user = await GetUser(userId, { userRepository });

    // Output
    if (!user) {
      return Boom.notFound();
    }
    const userSerializer = new UserSerializer();
    return userSerializer.serialize(user);
  },

  async deleteUser(request, h) {

    // Input
    const userId = request.params.id;

    // Treatment
    await DeleteUser(userId, { userRepository });

    // Output
    return h.response().code(204);
  },

};
