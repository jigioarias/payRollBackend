'use strict';

const Boom = require('@hapi/boom');
const ResponseSerializer = require('../serializers/ResponseSerializer');

const ListLicencias = require('../../application_business_rules/use_cases/ListLicencias');
const CreateLicenciaEmpleado = require('../../application_business_rules/use_cases/CreateLicenciaEmpleado');
const UpdateLicenciasMasivo = require('../../application_business_rules/use_cases/UpdateLicenciasMasivo');

const Response = require('../../application_business_rules/use_cases/Response');

const LicenciaRepository = require('../../application_business_rules/repositories/LicenciaRepository');
const LicenciaRepositoryMySQL = require('../storage/LicenciaRepositoryMYSQL');
const licenciaRepository = new LicenciaRepository(new LicenciaRepositoryMySQL());

const PersonaRepository = require('../../application_business_rules/repositories/PersonaRepository');
const PersonaRepositorySQL = require('../storage/PersonaRepositoryMYSQL');
const personaRepository = new PersonaRepository(new PersonaRepositorySQL());


const VacacionRepository = require('../../application_business_rules/repositories/VacacionRepository');
const VacacionRepositorySQL = require('../storage/VacacionRepositoryMYSQL');
const vacacionRepository = new VacacionRepository(new VacacionRepositorySQL());



const IncapacidadRepository = require('../../application_business_rules/repositories/IncapacidadRepository');//interface
const IncapacidadRepositorySQL = require('../storage/IncapacidadRepositoryMYSQL'); //implementacion
const incapacidadRepository = new IncapacidadRepository(new IncapacidadRepositorySQL());


module.exports = {

  async ingresar(request) {

    let response = null;
    const responseSerializer = new ResponseSerializer();
    let periodo = request.payload.registerPeriod;
    const enterprise = request.payload.enterprise;
    const document = request.payload.document;
    const initDate = request.payload.initDate;
    const endDate = request.payload.endDate;
    const type = request.payload.type;
    const remuneration = request.payload.remuneration;
    const user = request.payload.user;
    const employeeId = request.payload.employeeId;
    const year = request.payload.year;
    const clase = request.payload.clase;
    const salary = request.payload.salary;
    const state = request.payload.state;
    const hours = request.payload.hours;



    try {


      const guardarLicencia = await CreateLicenciaEmpleado(enterprise, document, initDate, endDate, type,
        remuneration, user, employeeId, year, periodo, clase, salary, state, hours, { licenciaRepository }, { vacacionRepository }, { incapacidadRepository });


      if (guardarLicencia.error == null) {
        response = new Response(guardarLicencia, 'OK', '');
        return responseSerializer.serialize(response);
      } else {

        response = new Response(guardarLicencia, 'OK', guardarLicencia.error);
        return responseSerializer.serialize(response);
      }


    } catch (err) {

      response = new Response(null, 'Error', err);
      return responseSerializer.serialize(response);
    }

  },

  async list(request) {

    // Input
    // Treatment
    const lista = await ListLicencias(request.payload, { licenciaRepository }, { personaRepository });
    // Output
    const response = new Response(lista, 'OK', '');
    const responseSerializer = new ResponseSerializer();
    return responseSerializer.serialize(response);
  },


  async updateLicenciasMasivo(request) {

    var listaLicencias = [];
    let response = null;
    const responseSerializer = new ResponseSerializer();

    try {

      listaLicencias = await UpdateLicenciasMasivo(request.payload, { licenciaRepository });

      response = new Response(listaLicencias, 'OK', null);


    } catch (err) {
      console.log('ERROR', err);
      response = new Response(listaLicencias, 'Error', err);

    }

    return responseSerializer.serialize(response);
  },


};

