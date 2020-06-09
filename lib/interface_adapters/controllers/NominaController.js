    'use strict';

const Boom = require('@hapi/boom');
const ResponseSerializer = require('../serializers/ResponseSerializer');
const ListEmpleadosClaseNomina = require('../../application_business_rules/use_cases/ListEmpleadosClaseNomina');
const ListConceptoClaseNomina = require('../../application_business_rules/use_cases/ListConceptoClaseNomina');
const Response = require('../../application_business_rules/use_cases/Response');

const ConceptoNominaRepository = require('../../application_business_rules/repositories/ConcepNominaRepository');
const ConceptoNominaRepositorySQL = require('../storage/ConceptoNominaRepositoryMYSQL');
const conceptoNominaRepository = new ConceptoNominaRepository(new ConceptoNominaRepositorySQL());

const EmpleadoRepository = require('../../application_business_rules/repositories/EmpleadoRepository');
const EmpleadoRepositoryMySQL = require('../storage/EmpleadoRepositoryMYSQL');
const empleadoRepository = new EmpleadoRepository(new EmpleadoRepositoryMySQL());






module.exports = {
  async createNomina(request) {

    let response = null;
    const responseSerializer = new ResponseSerializer();

    try {

 
      let empleados = await ListEmpleadosClaseNomina(request.payload.enterprise,request.payload.active,request.payload.classPayRoll, { empleadoRepository });
      let conceptosNominaBasicos = await ListConceptoClaseNomina(request.payload.enterprise,request.payload.classPayRoll,request.payload.active, { conceptoNominaRepository });
  

      conceptosNominaBasicos.forEach(element => {
        console.log('element>>>>>',element);
      });
         
      response = new Response(empleados, 'OK', '');
      return responseSerializer.serialize(response);

    } catch (err) {
      console.log('Error>>>>>>>>',err);
      response = new Response(null, 'Error', err);
      return responseSerializer.serialize(response);
    }


  },




};
