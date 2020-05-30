'use strict';

const ClaseNominaController = require('../../interface_adapters/controllers/ClaseNominaController');

module.exports = {
  name: 'clasesNomina',
  version: '1.0.0',
  register: async (server) => {

    server.route([
      {
        method: 'GET',
        path: '/classPayRolls',
        handler: ClaseNominaController.findClaseNominas,
        options: {
          description: 'List all Clase Nominas',
          tags: ['api'],
        },
      },
      {
        method: 'POST',
        path: '/classPayRolls',
        handler: ClaseNominaController.createClaseNomina,
        options: {
          description: 'Create a Clase Nominas',
          tags: ['api'],
        },
      }
      ,
      /*{
        method: 'GET',
        path: '/users/{id}',
        handler: UsersController.getUser,
        options: {
          description: 'Get a user by its {id}',
          tags: ['api'],
        },
      },
      {
        method: 'DELETE',
        path: '/users/{id}',
        handler: UsersController.deleteUser,
        options: {
          description: 'Delete a user',
          tags: ['api'],
        },
      },*/
    ]);
  }
};