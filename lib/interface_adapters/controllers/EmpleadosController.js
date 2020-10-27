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
const FindEmpleado = require('../../application_business_rules/use_cases/FindEmpleado');
const UpdateEmpleadosMasivo = require('../../application_business_rules/use_cases/UpdateEmpleadosMasivo');
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
    let empleado = null;
    try {

      console.log('INGRESANDO A CREAR',request.payload.person);
      let personag = await CreatePersona(request.payload.person, { personaRepository });
      console.log(personag);
      if(personag.error == null ){
            empleado = await CreateEmpleado(request.payload.employee, personag.person, { empleadoRepository });
            response = new Response(empleado, 'OK', empleado.error);
          
      }else{
        response = new Response(empleado, 'OK', personag.error);
      }

    } catch (err) {
      console.log(err);
      empleadoDTO = new EmpleadoDTO(null, null);
      response = new Response(empleadoDTO, 'Error', err);
      
    }
    return responseSerializer.serialize(response);

  },


  async createEmpleadoMasivo(request) {

    var empleadoDTO = null;
    let response = null;
    const responseSerializer = new ResponseSerializer();

    try {

     
      const empleado = await CreateEmpleadoMasivo(request.payload,{personaRepository}, { empleadoRepository });

      response = new Response(empleado, 'OK', empleado.error);
      return responseSerializer.serialize(response);


    } catch (err) {

      empleadoDTO = new EmpleadoDTO(null, null);
      response = new Response(empleadoDTO, 'Error', err);
      return responseSerializer.serialize(response);
    }


  },

  async findEmpleados(request) {
    // Treatment
   
    try {

     
      const empleados = await ListEmpleados(request.payload,
                                            { empleadoRepository }, { personaRepository });

      console.log('empleados:::',empleados);
      const responseSerializer = new ResponseSerializer();
      const response = new Response(empleados, 'OK', '');
      return responseSerializer.serialize(response);

    } catch (error) {
      console.log('Error al cargar la busqueda de empleados:',error);
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



  async get(request) {
    // Treatment

    try {
      const document = request.params.id;
      const empleado = await FindEmpleado(document,{ personaRepository },{empleadoRepository});

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

      const personag = await UpdatePersona(request.payload.person,{ personaRepository });
      if(personag.error==null){
            const empleado = await UpdateEmpleado(request.payload.employee, personag.person, { empleadoRepository })
            response = new Response(empleado, 'OK', empleado.error);
      }else{
        empleadoDTO = new EmpleadoDTO(personag.person,null);
        empleadoDTO.setError(personag.error); 
        response = new Response(empleadoDTO, 'OK', personag.error);
      }
      return responseSerializer.serialize(response);


    } catch (err) {
      console.log('ERROR', err);
      empleadoDTO = new EmpleadoDTO(null, null);
      response = new Response(empleadoDTO, 'Error', err);
      return responseSerializer.serialize(response);
    }


  },
  


  async updateEmpleadosMasivo(request) {


    var empleadoDTO = null;
    var listaEmpleados =[];
    let response = null;
    const responseSerializer = new ResponseSerializer();

    try {

      listaEmpleados= await UpdateEmpleadosMasivo(request.payload,{ personaRepository },{empleadoRepository});
      if(listaEmpleados.error==null){
      response = new Response(listaEmpleados, 'OK', null);
      }else{
        response = new Response(listaEmpleados, 'OK', listaEmpleados.error);
      }
     

    } catch (err) {
      console.log('ERROR', err);
       response = new Response(listaEmpleados, 'Error', err);
     
    }

    return responseSerializer.serialize(response);
  },


};
