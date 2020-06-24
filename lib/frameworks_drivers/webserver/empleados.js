'use strict';

const EmpleadossController = require('../../interface_adapters/controllers/EmpleadosController');

module.exports = {
  name: 'empleado',
  version: '1.0.0',
  register: async (server) => {

    server.route([
      {
        method: 'GET',
        path: '/employees',
        handler: EmpleadossController.findEmpleados,
        options: {
          description: 'List all empleados',
          tags: ['api'],
        },
      },
      {
        method: 'GET',
        path: '/employees/{id}',
        handler: EmpleadossController.find,
        options: {
          description: 'empleado por documento',
          tags: ['api'],
        },
      },
  
      {
        method: 'POST',
        path: '/employees',
        handler: EmpleadossController.createEmpleado,
        options: {
          description: 'Create a empleado',
          tags: ['api'],
        }
      },
      {
        method: 'PUT',
        path: '/employees',
        handler: EmpleadossController.updateEmpleado,
        options: {
          description: 'Create a empleado',
          tags: ['api'],
        }
      },
    ]);
  }
};