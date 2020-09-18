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
      {
        method: 'POST',
        path: '/vacationRequestList',
        handler: SolicitudVacacionController.list,
        options: {
          description: 'listar solicitudes solicitud',
          tags: ['api'],
        },
      },
      {
        method: 'POST',
        path: '/vacationRequest',
        handler: SolicitudVacacionController.list,
        options: {
          description: 'create solicitudes solicitud',
          tags: ['api'],
        },
      },
    ]);
  }
};