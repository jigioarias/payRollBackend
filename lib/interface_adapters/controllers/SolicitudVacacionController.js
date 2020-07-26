'use strict';

const Boom = require('@hapi/boom');
const ResponseSerializer = require('../serializers/ResponseSerializer');

const ListClaseNominas = require('../../application_business_rules/use_cases/ListClaseNominas');
const UpdateSolicitudVacacion = require('../../application_business_rules/use_cases/UpdateSolicitudVacacion');
const ListSolicitudVacacion = require('../../application_business_rules/use_cases/ListSolicitudVacacion');

const Response = require('../../application_business_rules/use_cases/Response');

const SolicitudVacacionRepository = require('../../application_business_rules/repositories/SolicitudVacacionRepository');
const SolicitudVacacionRepositoryMySQL = require('../storage/SolicitudVacacionRepositoryMYSQL');
const solicitudVacacionRepository = new SolicitudVacacionRepository(new SolicitudVacacionRepositoryMySQL());


module.exports = {

  async update(request) {

    // Input

    console.log(request.payload);

    // Treatment
    const solicitud = await UpdateSolicitudVacacion( request.payload, { solicitudVacacionRepository });

    // Output
    const response =new Response(solicitud,'OK','');
    const responseSerializer = new ResponseSerializer();
    return responseSerializer.serialize(response);
  },
  async list(request) {

    // Input

    console.log(request.payload);

    // Treatment
    const lista = await ListSolicitudVacacion( request.payload, { solicitudVacacionRepository });

    // Output
    const response =new Response(lista,'OK','');
    const responseSerializer = new ResponseSerializer();
    return responseSerializer.serialize(response);
  },


};

