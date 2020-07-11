'use strict';

const SolicitudVacacionController = require('../../interface_adapters/controllers/SolicitudVacacionController');

module.exports = {
  name: 'solicitudVacacion',
  version: '1.0.0',
  register: async (server) => {

    server.route([
      {
        method: 'PUT',
        path: '/vacationRequest',
        handler: SolicitudVacacionController.update,
        options: {
          description: 'actualizar solicitud',
          tags: ['api'],
        },
      },
      
    ]);
  }
};