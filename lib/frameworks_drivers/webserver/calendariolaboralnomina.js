'use strict';

const CalendarioLaboralController = require('../../interface_adapters/controllers/CalendarioLaboralController');

module.exports = {
  name: 'workCalendar',
  version: '1.0.0',
  register: async (server) => {

    server.route([
      {
        method: 'POST',
        path: '/workCalendar/dates',
        handler: CalendarioLaboralController.getFechasCalendarioLaboral,
        options: {
          description: 'Lista de fechas para un periodo',
          tags: ['api'],
        },
      },
 
     
    ]);
  }
};