'use strict';

const Boom = require('@hapi/boom');
const ResponseSerializer = require('../serializers/ResponseSerializer');
const ListEmpleados = require('../../application_business_rules/use_cases/ListEmpleados');
const ListEmpleadoIdPersona = require('../../application_business_rules/use_cases/ListEmpleadoIdPersona');
const CreateEmpleado = require('../../application_business_rules/use_cases/CreateEmpleado');
const CreateEmpleadoMasivo = require('../../application_business_rules/use_cases/CreateEmpleadoMasivo');

const GetEmpleado = require('../../application_business_rules/use_cases/GetEmpleado');

const CreatePersona = require('../../application_business_rules/use_cases/CreatePersona');
const UpdateEmpleado = require('../../application_business_rules/use_cases/UpdateEmpleado');
const UpdatePersona = require('../../application_business_rules/use_cases/UpdatePersona');
const Persona = require('../../enterprise_business_rules/entities/Persona');

const Response = require('../../application_business_rules/use_cases/Response');
const EmpleadoDTO = require('../../application_business_rules/use_cases/EmpleadoDTO');

const EmpleadoRepository = require('../../application_business_rules/repositories/EmpleadoRepository');
const PersonaRepository = require('../../application_business_rules/repositories/PersonaRepository');

//const UserRepositoryInMemory = require('../storage/UserRepositoryInMemory');
const EmpleadoRepositoryMySQL = require('../storage/EmpleadoRepositoryMYSQL');
const PersonaRepositorySQL = require('../storage/PersonaRepositoryMYSQL');

const empleadoRepository = new EmpleadoRepository(new EmpleadoRepositoryMySQL());
const personaRepository = new PersonaRepository(new PersonaRepositorySQL());

const ClaseNonminaRepository = require('../../application_business_rules/repositories/ClaseNominaRepository');
const ClaseNominaRepositorySQL = require('../storage/ClaseNominaRepositoryMYSQL');
const claseNominaRepository = new ClaseNonminaRepository(new ClaseNominaRepositorySQL());

const PeriodoClaseRepository = require('../../application_business_rules/repositories/PeriodoClaseRepository');
const PeriodoClaseRepositorySQL = require('../storage/PeriodoClaseRepositoryMYSQL');
const periodClaseRepository = new PeriodoClaseRepository(new PeriodoClaseRepositorySQL());

const SenanaLaboralRepository = require('../../application_business_rules/repositories/SemanaLaboralRepository');
const SemanaLaboralRepositorySQL = require('../storage/SemanaLaboralRepositoryMYSQL');
const semanaLaboralRepository = new SenanaLaboralRepository(new SemanaLaboralRepositorySQL());

const CalendarioLaboralRepository = require('../../application_business_rules/repositories/CalendarioLaboralRepository');
const CalendarioLaboralRepositorySQL = require('../storage/CalendarioLaboralRepositoryMYSQL');
const calendarioLaboralRepository = new CalendarioLaboralRepository(new CalendarioLaboralRepositorySQL());

const PrestacionSocialRepository = require('../../application_business_rules/repositories/PrestacionSocialRepository');
const PrestacionSocialRepositoryMySQL = require('../storage/PrestacionSocialRepositoryMYSQL');
const prestacionSocialRepository = new PrestacionSocialRepository(new PrestacionSocialRepositoryMySQL());


const SolicitudVacacionRepository = require('../../application_business_rules/repositories/SolicitudVacacionRepository');
const SolicitudVacacionRepositoryMySQL = require('../storage/SolicitudVacacionRepositoryMYSQL');
const solicitudVacacionRepository = new SolicitudVacacionRepository(new SolicitudVacacionRepositoryMySQL());


/*
const UserRepositorySQLite = require('../storage/UserRepositorySQLite');
const userRepository = new UserRepository(new UserRepositorySQLite());
*/



module.exports = {
  async createEmpleado(request) {




    var empleadoDTO = null;
    let response = null;
    const responseSerializer = new ResponseSerializer();

    try {


      let personag = await CreatePersona(request.payload.person, { personaRepository });

      const idPersona = personag.id;

      const empleado = await CreateEmpleado(request.payload.employee, idPersona, { empleadoRepository });

      empleadoDTO = new EmpleadoDTO(personag, empleado);
      response = new Response(empleadoDTO, 'OK', '');
      return responseSerializer.serialize(response);


    } catch (err) {

      empleadoDTO = new EmpleadoDTO(null, null);
      response = new Response(empleadoDTO, 'Error', err);
      return responseSerializer.serialize(response);
    }


  },


  async createEmpleadoMasivo(request) {




    var empleadoDTO = null;
    let response = null;
    const responseSerializer = new ResponseSerializer();

    try {


      
      const empleado = await CreateEmpleadoMasivo(request.payload,{personaRepository}, { empleadoRepository });

      response = new Response(empleado, 'OK', '');
      return responseSerializer.serialize(response);


    } catch (err) {

      empleadoDTO = new EmpleadoDTO(null, null);
      response = new Response(empleadoDTO, 'Error', err);
      return responseSerializer.serialize(response);
    }


  },

  async findEmpleados() {
    // Treatment

    try {
      const empleados = await ListEmpleados(1, true, { empleadoRepository }, { personaRepository });

      const responseSerializer = new ResponseSerializer();
      const response = new Response(empleados, 'OK', '');
      return responseSerializer.serialize(response);

    } catch (error) {
      const responseSerializer = new ResponseSerializer();
      const response = new Response(null, 'Error', error);
      return responseSerializer.serialize(response);

    }


  },



  async find(request) {
    // Treatment

    try {
      const document = request.params.id;
      const empleado = await GetEmpleado(1,document,true,{ personaRepository },{empleadoRepository},{claseNominaRepository},{periodClaseRepository},
        {semanaLaboralRepository},{calendarioLaboralRepository},{prestacionSocialRepository},{solicitudVacacionRepository});

      const responseSerializer = new ResponseSerializer();
      const response = new Response(empleado, 'OK', '');
      return responseSerializer.serialize(response);

    } catch (error) {
      console.log(error);
       const responseSerializer = new ResponseSerializer();
      const response = new Response(null, 'Error', error);
      return responseSerializer.serialize(response);

    }


  },



  async updateEmpleado(request) {





    var empleadoDTO = null;
    let response = null;
    const responseSerializer = new ResponseSerializer();

    try {


      const personag = await UpdatePersona(
        request.payload.person,
        { personaRepository });

      const idPersona = personag.id;
      const empleado = await UpdateEmpleado(request.payload.employee, idPersona, { empleadoRepository })

      empleadoDTO = new EmpleadoDTO(personag, empleado);
      response = new Response(empleadoDTO, 'OK', '');

      return responseSerializer.serialize(response);


    } catch (err) {
      console.log('ERROR', err);
      empleadoDTO = new EmpleadoDTO(null, null);
      response = new Response(empleadoDTO, 'Error', err);
      return responseSerializer.serialize(response);
    }


  },


};
