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
        path: '/concept/conceptByType',
        handler: ConceptoController.findConceptosByType,
        options: {
          description: 'List all conceptos por tipo',
          tags: ['api'],
        },
      },

      {
        method: 'POST',
        path: '/concept/conceptsXIds',
        handler: ConceptoController.listConceptosXIds,
        options: {
          description: 'List all conceptos por ids',
          tags: ['api'],
        },
      }
   ]);
  }
};