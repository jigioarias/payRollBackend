'use strict';

const ClaseNominaController = require('../../interface_adapters/controllers/ClaseNominaController');

module.exports = {
  name: 'clasesNomina',
  version: '1.0.0',
  register: async (server) => {

    server.route([
      {
        method: 'POST',
        path: '/classPayRolls/list',
        handler: ClaseNominaController.find,
        options: {
          description: 'List all Clase Nominas',
          tags: ['api'],
        },
      },
      {
        method: 'POST',
        path: '/classPayRolls',
        handler: ClaseNominaController.create,
        options: {
          description: 'Create a Clase Nominas',
          tags: ['api'],
        },
      },
      {
        method: 'PUT',
        path: '/classPayRolls',
        handler: ClaseNominaController.update,
        options: {
          description: 'Update a Clase Nominas',
          tags: ['api'],
        },
      },
      {
        method: 'GET',
        path: '/classPayRolls/{id}',
        handler:ClaseNominaController.get,
        options: {
          description: 'Get a Clase nomina por  {id}',
          tags: ['api'],
        },
      },
      /*{
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