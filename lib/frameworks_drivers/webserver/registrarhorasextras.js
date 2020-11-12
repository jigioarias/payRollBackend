'use strict';

const RegistrarHorasExtrasController = require('../../interface_adapters/controllers/RegistrarHorasExtrasController');

module.exports = {
  name: 'horasExtras',
  version: '1.0.0',
  register: async (server) => {

    server.route([
  
      {
        method: 'POST',
        path: '/extraHours',
        handler: RegistrarHorasExtrasController.ingresar,
        options: {
          description: 'Ingresar horas extras',
          tags: ['api'],
        },
      },
      {
        method: 'POST',
        path: '/extraHoursList',
        handler: RegistrarHorasExtrasController.list,
        options: {
          description: 'listar  horas extras',
          tags: ['api'],
        },
      },
    ]); 
  }
};