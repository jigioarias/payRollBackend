'use strict';

const NominaController = require('../../interface_adapters/controllers/NominaController');

module.exports = {
  name: 'generateClassPayRolls',
  version: '1.0.0',
  register: async (server) => {

    server.route([
    
      {
        method: 'POST',
        path: '/generateClassPayRoll',
        handler: NominaController.createNomina,
        options: {
          description: 'Create una Nomina',
          tags: ['api'],
        }
      },
    
    ]);
  }
};