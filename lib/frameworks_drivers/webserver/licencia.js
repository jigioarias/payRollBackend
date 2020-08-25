'use strict';

const LicenciaController = require('../../interface_adapters/controllers/LicenciaController');

module.exports = {
  name: 'licencia',
  version: '1.0.0',
  register: async (server) => {

    server.route([

      {
        method: 'POST',
        path: '/leaveList',
        handler: LicenciaController.list,
        options: {
          description: 'listar licencias ',
          tags: ['api'],
        },
      },
    ]);
  }
};