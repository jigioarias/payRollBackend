'use strict';

const CentroCostosController = require('../../interface_adapters/controllers/CentroCostosController');

module.exports = {
  name: 'costcenter',
  version: '1.0.0',
  register: async (server) => {

    server.route([
      {
        method: 'GET',
        path: '/centroCostos',
        handler: CentroCostosController.findCentroCostos,
        options: {
          description: 'List all Centro Costos',
          tags: ['api'],
        },
      },
      {
        method: 'POST',
        path: '/centroCostos',
        handler: CentroCostosController.createCentroCostos,
        options: {
          description: 'Create a Centro Costos',
          tags: ['api'],
        },
      }
      ,
      
    ]);
  }
};