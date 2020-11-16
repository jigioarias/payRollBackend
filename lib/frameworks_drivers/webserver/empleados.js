'use strict';

const EmpleadossController = require('../../interface_adapters/controllers/EmpleadosController');

module.exports = {
  name: 'empleado',
  version: '1.0.0',
  register: async (server) => {

    server.route([
      {
        method: 'POST',
        path: '/employee/listEmployees',
        handler: EmpleadossController.findEmpleados,
        options: {
          description: 'List all empleados',
          tags: ['api'],
        },
      },
      {
        method: 'POST',
        path: '/employee/employeeInfo',
        handler: EmpleadossController.find,
        options: {
          description: 'empleado por documento',
          tags: ['api'],
        },
      },
      {
        method: 'POST',
        path: '/employee',
        handler: EmpleadossController.get,
        options: {
          description: 'empleado por id Empleado',
          tags: ['api'],
        },
      },

      {
        method: 'POST',
        path: '/employee/employees',
        handler: EmpleadossController.createEmpleado,
        options: {
          description: 'Create a empleado',
          tags: ['api'],
        }
      },
      {
        method: 'POST',
        path: '/employee/employeesMasive',
        handler: EmpleadossController.createEmpleadoMasivo,
        options: {
          description: 'Create a empleados Masivos',
          tags: ['api'],
        }
      },
      {
        method: 'PUT',
        path: '/employee/employeesUpdateMasive',
        handler: EmpleadossController.updateEmpleadosMasivo,
        options: {
          description: 'Update a empleados Masivos',
          tags: ['api'],
        }
      },
      {
        method: 'PUT',
        path: '/employee/employees',
        handler: EmpleadossController.updateEmpleado,
        options: {
          description: 'Create a empleado',
          tags: ['api'],
        }
      },
    ]);
  }
};