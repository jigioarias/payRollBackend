'use strict';

const SucursalController = require('../../interface_adapters/controllers/SucursalController');

module.exports = {
  name: 'sucursales',
  version: '1.0.0',
  register: async (server) => {

    server.route([
      {
        method: 'GET',
        path: '/sucursals',
        handler: SucursalController.findSucursals,
        options: {
          description: 'List all Sucursal',
          tags: ['api'],
        },
      },
      {
        method: 'POST',
        path: '/sucursals',
        handler: SucursalController.createSucursal,
        options: {
          description: 'Create a Sucursal',
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