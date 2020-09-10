'use strict';

const IncapacidadController = require('../../interface_adapters/controllers/IncapacidadController');

module.exports = {
  name: 'incapacidad',
  version: '1.0.0',
  register: async (server) => {

    server.route([

      {
        method: 'POST',
        path: '/inabilityList',
        handler: IncapacidadController.list,
        options: {
          description: 'listar incapacidades ',
          tags: ['api'],
        },
      },
      {
        method: 'POST',
        path: '/inability',
        handler: IncapacidadController.ingresar,
        options: {
          description: 'ingresar incapacidad empleado ',
          tags: ['api'],
        },
      },
    ]);
  }
};