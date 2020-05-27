'use strict';

const CentroCostosController = require('../../interface_adapters/controllers/CentroCostosController');

module.exports = {
  name: 'centroCostos',
  version: '1.0.0',
  register: async (server) => {

    server.route([
      {
        method: 'GET',
        path: '/centroCostos',
        handler: CentroCostosController.findCentroCostos,
        options: {
          description: 'List all Centro Costos',
          tags: ['api'],
        },
      },
      {
        method: 'POST',
        path: '/centroCostos',
        handler: CentroCostosController.createCentroCostos,
        options: {
          description: 'Create a Centro Costos',
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