'use strict';

const ConceptoController = require('../../interface_adapters/controllers/ConceptoController');

module.exports = {
  name: 'concepto',
  version: '1.0.0',
  register: async (server) => {

    server.route([
      {
        method: 'POST',
        path: '/concept',
        handler: ConceptoController.findConceptos,
        options: {
          description: 'List all conceptos',
          tags: ['api'],
        },
      },
      {
        method: 'POST',
        path: '/conceptByType',
        handler: ConceptoController.findConceptosByType,
        options: {
          description: 'List all conceptos por tipo',
          tags: ['api'],
        },
      },

  /*    {
        method: 'POST',
        path: '/classPayRolls',
        handler: ConceptoNominaController.createConceptoNomina,
        options: {
          description: 'Create a conceptos Nominas',
          tags: ['api'],
        },
      }
      ,
      {
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