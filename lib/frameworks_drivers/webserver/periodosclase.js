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
        handler: PeriodoClaseController.find,
        options: {
          description: 'List all periodos',
          tags: ['api'],
        },
      },
      {
        method: 'GET',
        path: '/period/{id}',
        handler:PeriodoClaseController.get,
        options: {
          description: 'Get a Clase nomina por  {id}',
          tags: ['api'],
        },
      },

      {
        method: 'POST',
        path: '/period',
        handler: PeriodoClaseController.create,
        options: {
          description: 'Create a Periodo',
          tags: ['api'],
        },
      },
      {
        method: 'PUT',
        path: '/period',
        handler: PeriodoClaseController.update,
        options: {
          description: 'Update Periodo',
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
      {
        method: 'POST',
        path: '/periodNext',
        handler: PeriodoClaseController.findPeriodoSiguiente,
        options: {
          description: 'obtener Periodo Siguiente',
          tags: ['api'],
        },
      },


    ]);
  }
};