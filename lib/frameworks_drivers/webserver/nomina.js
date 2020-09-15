'use strict';

const NominaController = require('../../interface_adapters/controllers/NominaController');
const RegistrarVacacionesController = require('../../interface_adapters/controllers/RegistrarVacacionesController');


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
      {
        method: 'POST',
        path: '/settleClassPayRoll',
        handler: NominaController.asentarNomina,
        options: {
          description: 'Asentar una Nomina',
          tags: ['api'],
        }
      },

      {
        method: 'POST',
        path: '/vacation',
        handler: RegistrarVacacionesController.ingresar,
        options: {
          description: 'Registrar vacaciones',
          tags: ['api'],
        }
      },
    
    ]);
  }
};