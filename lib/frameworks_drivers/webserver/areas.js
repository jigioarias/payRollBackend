'use strict';

const AreasController = require('../../interface_adapters/controllers/AreasController');

module.exports = {
  name: 'areas',
  version: '1.0.0',
  register: async (server) => {

    server.route([
      {
        method: 'GET',
        path: '/areas',
        handler: AreasController.findAreas,
        options: {
          description: 'List all Areas',
          tags: ['api'],
        },
      },
      {
        method: 'POST',
        path: '/areas',
        handler: AreasController.createArea,
        options: {
          description: 'Create a Area',
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