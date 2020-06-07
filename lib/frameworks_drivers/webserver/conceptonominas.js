'use strict';

const ConceptoNominaController = require('../../interface_adapters/controllers/ConceptoNominaController');

module.exports = {
  name: 'conceptoNomina',
  version: '1.0.0',
  register: async (server) => {

    server.route([
      {
        method: 'GET',
        path: '/conceptPayRolls',
        handler: ConceptoNominaController.findConceptoNominas,
        options: {
          description: 'List all conceptos Nominas',
          tags: ['api'],
        },
      },
      {
        method: 'POST',
        path: '/conceptPayRolls',
        handler: ConceptoNominaController.createConceptoNomina,
        options: {
          description: 'Create a conceptos Nominas',
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