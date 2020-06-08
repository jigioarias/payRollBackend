    'use strict';

const Boom = require('@hapi/boom');
const ResponseSerializer = require('../serializers/ResponseSerializer');
const ListEmpleadosClaseNomina = require('../../application_business_rules/use_cases/ListEmpleadosClaseNomina');
const Response = require('../../application_business_rules/use_cases/Response');

const EmpleadoRepository = require('../../application_business_rules/repositories/EmpleadoRepository');
const EmpleadoRepositoryMySQL = require('../storage/EmpleadoRepositoryMYSQL');

const empleadoRepository = new EmpleadoRepository(new EmpleadoRepositoryMySQL());





module.exports = {
  async createNomina(request) {

  


    let response = null;
    const responseSerializer = new ResponseSerializer();

    try {

  
      let empleados = await ListEmpleadosClaseNomina(request.payload.enterprise,request.payload.active,request.payload.classPayRoll, { empleadoRepository });

         
      response = new Response(empleados, 'OK', '');
      return responseSerializer.serialize(response);


    } catch (err) {

      empleadoDTO = new EmpleadoDTO(null, null);
      response = new Response(null, 'Error', err);
      return responseSerializer.serialize(response);
    }


  },


 

};
