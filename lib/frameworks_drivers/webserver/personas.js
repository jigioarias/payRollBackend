'use strict';

const AreasController = require('../../interface_adapters/controllers/PersonasController');

module.exports = {
  name: 'personas',
  version: '1.0.0',
  register: async (server) => {

    server.route([
      {
        method: 'GET',
        path: '/persons',
        handler: AreasController.findAreas,
        options: {
          description: 'List all Personas',
          tags: ['api'],
        },
      },
      {
        method: 'POST',
        path: '/persons',
        handler: AreasController.createArea,
        options: {
          description: 'Create a Personas',
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