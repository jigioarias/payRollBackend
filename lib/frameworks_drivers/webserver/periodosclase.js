'use strict';

const PeriodoClaseController = require('../../interface_adapters/controllers/PeriodoClaseController');

module.exports = {
  name: 'period',
  version: '1.0.0',
  register: async (server) => {

    server.route([
      {
        method: 'GET',
        path: '/period',
        handler: PeriodoClaseController.findCPeriodosClase,
        options: {
          description: 'List all periodos',
          tags: ['api'],
        },
      },
      {
        method: 'POST',
        path: '/period',
        handler: PeriodoClaseController.createPeriodoClase,
        options: {
          description: 'Create a Periodo',
          tags: ['api'],
        },
      },
  
      {
        method: 'POST',
        path: '/periodClassPayRoll',
        handler: PeriodoClaseController.findPeriodosPorClase,
        options: {
          description: 'lista de Periodo para una clase',
          tags: ['api'],
        },
      },
    ]);
  }
};