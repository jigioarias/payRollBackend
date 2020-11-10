'use strict';

const Boom = require('@hapi/boom');
const ResponseSerializer = require('../serializers/ResponseSerializer');

const ListClaseNominas = require('../../application_business_rules/use_cases/ListClaseNominas');
const UpdateSolicitudVacacion = require('../../application_business_rules/use_cases/UpdateSolicitudVacacion');
const CreateSolicitudVacacion = require('../../application_business_rules/use_cases/CreateSolicitudVacacion');

const ListSolicitudVacacion = require('../../application_business_rules/use_cases/ListSolicitudVacacion');

const Response = require('../../application_business_rules/use_cases/Response');

const SolicitudVacacionRepository = require('../../application_business_rules/repositories/SolicitudVacacionRepository');
const SolicitudVacacionRepositoryMySQL = require('../storage/SolicitudVacacionRepositoryMYSQL');
const solicitudVacacionRepository = new SolicitudVacacionRepository(new SolicitudVacacionRepositoryMySQL());

const PersonaRepository = require('../../application_business_rules/repositories/PersonaRepository');
const PersonaRepositorySQL = require('../storage/PersonaRepositoryMYSQL');
const personaRepository = new PersonaRepository(new PersonaRepositorySQL());


const EmpleadoRepository = require('../../application_business_rules/repositories/EmpleadoRepository');
const EmpleadoRepositoryMySQL = require('../storage/EmpleadoRepositoryMYSQL');
const empleadoRepository = new EmpleadoRepository(new EmpleadoRepositoryMySQL());

const VacacionRepository = require('../../application_business_rules/repositories/VacacionRepository');
const  VacacionRepositorySQL = require('../storage/VacacionRepositoryMYSQL');
const vacacionRepository = new VacacionRepository(new VacacionRepositorySQL());

const LicenciaRepository = require('../../application_business_rules/repositories/LicenciaRepository');//interface
const  LicenciaRepositorySQL = require('../storage/LicenciaRepositoryMYSQL'); //implementacion
const licenciaRepository = new LicenciaRepository(new LicenciaRepositorySQL());

const IncapacidadRepository = require('../../application_business_rules/repositories/IncapacidadRepository');//interface
const  IncapacidadRepositorySQL = require('../storage/IncapacidadRepositoryMYSQL'); //implementacion
const incapacidadRepository = new IncapacidadRepository(new IncapacidadRepositorySQL());


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


    // Treatment
    const lista = await ListSolicitudVacacion( request.payload, { solicitudVacacionRepository },{personaRepository});

    // Output
    const response =new Response(lista,'OK','');
    const responseSerializer = new ResponseSerializer();
    return responseSerializer.serialize(response);
  },
  async create(request) {

   // Treatment
   console.log('entorrrroo');
    const solicitud = await CreateSolicitudVacacion( request.payload, { solicitudVacacionRepository },{personaRepository},
      {empleadoRepository},{vacacionRepository},{licenciaRepository},{incapacidadRepository});
    // Output
    const response =new Response(solicitud,'OK','');
    const responseSerializer = new ResponseSerializer();
    return responseSerializer.serialize(response);
  },
  async list(request) {

    // Input

    // Treatment
    const lista = await ListSolicitudVacacion( request.payload, { solicitudVacacionRepository },{personaRepository});

    // Output
    const response =new Response(lista,'OK','');
    const responseSerializer = new ResponseSerializer();
    return responseSerializer.serialize(response);
  },

};

