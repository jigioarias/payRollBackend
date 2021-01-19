'use strict';

const Boom = require('@hapi/boom');
const ResponseSerializer = require('../serializers/ResponseSerializer');

const ImagenColeccionRepository = require('../../application_business_rules/repositories/ImagenColeccionRepository');
const Response = require('../../application_business_rules/use_cases/Response');
const ImagenColeccionRepositorySQL = require('../storage/ImagenColeccionRepositoryMYSQL');
const CreateImagenColeccion = require('../../application_business_rules/use_cases/CreateImagenColeccion');
const DeleteImagenColeccion = require('../../application_business_rules/use_cases/DeleteImagenColeccion');
const GetImagenColeccion = require('../../application_business_rules/use_cases/GetImagenColeccion');
const imagenColeccionRepository = new ImagenColeccionRepository(new ImagenColeccionRepositorySQL());


module.exports = {

  async create(request) {

    const coleccion = await CreateImagenColeccion( request.payload,{ imagenColeccionRepository });
    const response =new Response(coleccion,'OK','');
    const responseSerializer = new ResponseSerializer();
    return responseSerializer.serialize(response);
  },
  
  async delete(request) {

    const faceId = request.params.faceId;
    const coleccion = await DeleteImagenColeccion( faceId,{ imagenColeccionRepository });
    const response =new Response(coleccion,'OK','');
    const responseSerializer = new ResponseSerializer();
    return responseSerializer.serialize(response);
  },
  
  async getByDocument(request) {

    console.log('pay::',request.payload);
    const coleccion = await GetImagenColeccion( request.payload,{ imagenColeccionRepository });
    const response =new Response(coleccion,'OK','');
    const responseSerializer = new ResponseSerializer();
    return responseSerializer.serialize(response);
  },
  
  async loadFile(request) {

    console.log('pay::',request.payload);
    const response =new Response('file','OK','');
    const responseSerializer = new ResponseSerializer();
    return responseSerializer.serialize(response);
  },
};

