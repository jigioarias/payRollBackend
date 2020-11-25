'use strict';

const ColeccionController = require('../../interface_adapters/controllers/ColeccionController');
const ConceptoController = require('../../interface_adapters/controllers/ConceptoController');

module.exports = {
  name: 'coleccion',
  version: '1.0.0',
  register: async (server) => {

    server.route([
      {
        method: 'POST',
        path: '/coleccion/list',
        handler: ColeccionController.list,
        options: {
          description: 'Lista de colecciones',
          tags: ['api'],
        },
      },
    
      {
        method: 'POST',
        path: '/coleccion',
        handler: ColeccionController.create,
        options: {
          description: 'Crear una coleccion',
          tags: ['api'],
        },
      }
   ]);
  }
};