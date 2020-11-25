'use strict';

const ColeccionController = require('../../interface_adapters/controllers/ColeccionController');
const ConceptoController = require('../../interface_adapters/controllers/ConceptoController');
const ImagenColeccionController = require('../../interface_adapters/controllers/ImagenColeccionController');

module.exports = {
  name: 'imagenColeccion',
  version: '1.0.0',
  register: async (server) => {

    server.route([

      {
        method: 'POST',
        path: '/imagenColeccion',
        handler: ImagenColeccionController.create,
        options: {
          description: 'Crear una imagen coleccion',
          tags: ['api'],
        },
      },
      
      {
        method: 'DELETE',
        path: '/imagenColeccion/{faceId}',
        handler: ImagenColeccionController.delete,
        options: {
          description: 'Borrar una imagen coleccion',
          tags: ['api'],
        },
      },
      
      {
        method: 'POST',
        path: '/imagenColeccion/byDocument',
        handler: ImagenColeccionController.getByDocument,
        options: {
          description: 'Obtener  imagen coleccion por documento',
          tags: ['api'],
        },
      }
   ]);
  }
};