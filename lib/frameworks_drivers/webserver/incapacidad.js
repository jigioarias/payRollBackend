'use strict';

const IncapacidadController = require('../../interface_adapters/controllers/IncapacidadController');

module.exports = {
  name: 'incapacidad',
  version: '1.0.0',
  register: async (server) => {

    server.route([

      {
        method: 'POST',
        path: '/inability/list',
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
      {
        method: 'PUT',
        path: '/inability/inabilityUpdateMasive',
        handler: IncapacidadController.updateIncapacidadesMasivo,
        options: {
          description: 'Update a incapacidades Masivos',
          tags: ['api'],
        }
      },

    ]);
  }
};