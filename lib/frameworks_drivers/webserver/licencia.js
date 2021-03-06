'use strict';

const LicenciaController = require('../../interface_adapters/controllers/LicenciaController');

module.exports = {
  name: 'leave',
  version: '1.0.0',
  register: async (server) => {

    server.route([

      {
        method: 'POST',
        path: '/leave/leaveList',
        handler: LicenciaController.list,
        options: {
          description: 'listar licencias ',
          tags: ['api'],
        },
      },
      {
        method: 'POST',
        path: '/leave',
        handler: LicenciaController.ingresar,
        options: {
          description: 'ingresar licencia empleado ',
          tags: ['api'],
        },
      },
      {
        method: 'PUT',
        path: '/leave/leaveUpdateMasive',
        handler: LicenciaController.updateLicenciasMasivo,
        options: {
          description: 'Update a licencias Masivos',
          tags: ['api'],
        }
      },

    ]);
  }
};