'use strict';

const Boom = require('@hapi/boom');
const ResponseSerializer = require('../serializers/ResponseSerializer');

const ListIncapacidad = require('../../application_business_rules/use_cases/ListIncapacidad');
const CreateIncapacidadEmpleado = require('../../application_business_rules/use_cases/CreateIncapacidadEmpleado');

const Response = require('../../application_business_rules/use_cases/Response');

const IncapacidadRepository = require('../../application_business_rules/repositories/IncapacidadRepository');
const IncapacidadRepositoryMySQL = require('../storage/IncapacidadRepositoryMYSQL');
const incapacidadRepository = new IncapacidadRepository(new IncapacidadRepositoryMySQL());

const PersonaRepository = require('../../application_business_rules/repositories/PersonaRepository');
const PersonaRepositorySQL = require('../storage/PersonaRepositoryMYSQL');
const personaRepository = new PersonaRepository(new PersonaRepositorySQL());


const VacacionRepository = require('../../application_business_rules/repositories/VacacionRepository');
const VacacionRepositorySQL = require('../storage/VacacionRepositoryMYSQL');
const vacacionRepository = new VacacionRepository(new VacacionRepositorySQL());

const LicenciaRepository = require('../../application_business_rules/repositories/LicenciaRepository');//interface
const LicenciaRepositorySQL = require('../storage/LicenciaRepositoryMYSQL'); //implementacion
const UpdateIncapacidadesMasivo = require('../../application_business_rules/use_cases/UpdateIncapacidadesMasivo');
const licenciaRepository = new LicenciaRepository(new LicenciaRepositorySQL());



module.exports = {

  async ingresar(request) {

    console.log(request.payload);
    let response = null;
    const responseSerializer = new ResponseSerializer();
    let periodo = request.payload.registerPeriod;
    const enterprise = request.payload.enterprise;
    const document = request.payload.document;
    const initDate = request.payload.initDate;
    const endDate = request.payload.endDate;
    const type = request.payload.type;
    const percentage = request.payload.percentage;
    const user = request.payload.user;
    const employeeId = request.payload.employeeId;
    const year = request.payload.year;
    const clase = request.payload.clase;
    const salary = request.payload.salary;
    const state = request.payload.state;



    try {

      const guardarIncapacidad = await CreateIncapacidadEmpleado(enterprise, document, initDate, endDate, type, user, employeeId, year, periodo, clase, salary, state, percentage, { incapacidadRepository }, { vacacionRepository }, { licenciaRepository });

      console.log(guardarIncapacidad);

      if (guardarIncapacidad.error == null) {
        response = new Response(guardarIncapacidad, 'OK', '');
        return responseSerializer.serialize(response);
      } else {
        response = new Response(guardarIncapacidad, 'OK', guardarIncapacidad.error);
        return responseSerializer.serialize(response);
      }


    } catch (err) {
      response = new Response(null, 'Error', err);
      return responseSerializer.serialize(response);
    }

  },

  async list(request) {


    console.log(request.payload);

    const lista = await ListIncapacidad(request.payload, { incapacidadRepository }, { personaRepository });
    // Output
    const response = new Response(lista, 'OK', '');
    const responseSerializer = new ResponseSerializer();
    return responseSerializer.serialize(response);
  },

  async updateIncapacidadesMasivo(request) {

    var listaIncapacidades = [];
    let response = null;
    const responseSerializer = new ResponseSerializer();

    try {

      listaIncapacidades = await UpdateIncapacidadesMasivo(request.payload, { incapacidadRepository });

      response = new Response(listaIncapacidades, 'OK', null);


    } catch (err) {
      console.log('ERROR', err);
      response = new Response(listaIncapacidades, 'Error', err);

    }

    return responseSerializer.serialize(response);
  },



};

