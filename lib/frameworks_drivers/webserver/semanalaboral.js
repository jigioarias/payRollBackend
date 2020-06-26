'use strict';

const   semanaLaboralController = require('../../interface_adapters/controllers/SemanaLaboralController');

module.exports = {
  name: 'semanalaboral',
  version: '1.0.0',
  register: async (server) => {

    server.route([
      {
        method: 'GET',
        path: '/workweek',
        handler: semanaLaboralController.find,
        options: {
          description: 'List semanas',
          tags: ['api'],
        },
      },
      
    ]);
  }
};