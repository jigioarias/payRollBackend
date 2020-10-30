'use strict';

const ConceptoNominaController = require('../../interface_adapters/controllers/ConceptoNominaController');

module.exports = {
  name: 'conceptoNomina',
  version: '1.0.0',
  register: async (server) => {

    server.route([
      {
        method: 'POST',
        path: '/listConceptPayRolls',
        handler: ConceptoNominaController.find,
        options: {
          description: 'List all conceptos Nominas',
          tags: ['api'],
        },
      },

      {
        method: 'GET',
        path: '/conceptPayRolls/{id}',
        handler:ConceptoNominaController.get,
        options: {
          description: 'Get a concepto nomina por  {id}',
          tags: ['api'],
        },
      },
      {
        method: 'POST',
        path: '/conceptPayRolls',
        handler: ConceptoNominaController.create,
        options: {
          description: 'Create a conceptos Nominas',
          tags: ['api'],
        },
      },
      {
        method: 'PUT',
        path: '/conceptPayRolls',
        handler: ConceptoNominaController.update,
        options: {
          description: 'Update Concepto Nomina',
          tags: ['api'],
        },
      },

    ]);
  }
};