'use strict';

const Boom = require('@hapi/boom');
const ResponseSerializer = require('../serializers/ResponseSerializer');

const ListConceptoNominas = require('../../application_business_rules/use_cases/ListConceptoNominas');
const CreateConceptoNomina = require('../../application_business_rules/use_cases/CreateConceptoNomina');
const ConceptoNominaRepository = require('../../application_business_rules/repositories/ConcepNominaRepository');
const Response = require('../../application_business_rules/use_cases/Response');
const ConceptoNominaRepositorySQL = require('../storage/ConceptoNominaRepositoryMYSQL');
const conceptoNominaRepository = new ConceptoNominaRepository(new ConceptoNominaRepositorySQL());


module.exports = {

  async createConceptoNomina(request) {
  

    const ConceptoNomina = await CreateConceptoNomina( request.payload.enterprise, request.payload.clase, request.payload.concept,request.payload.active,request.payload.user, { conceptoNominaRepository });

   // Output
    const response =new Response(ConceptoNomina,'OK','');
    const responseSerializer = new ResponseSerializer();
    return responseSerializer.serialize(response);
  },

  async findConceptoNominas() {

    // Treatment
    const ConceptoNominas = await ListConceptoNominas({ conceptoNominaRepository });

    // Output
    const response =new Response(ConceptoNominas,'OK','');
    const responseSerializer = new ResponseSerializer();
    return responseSerializer.serialize(response);
  
  },

  /*
  async getArea(request) {

    // Input
    const userId = request.params.id;

    // Treatment
    const area = await GetUser(userId, { areaRepository });

    // Output
    if (!area) {
      return Boom.notFound();
    }
    const areaSerializer = new AreaSerializer();
    return areaSerializer.serialize(area);
  },

  async deleteArea(request, h) {

    // Input
    const areaId = request.params.id;

    // Treatment
    await DeleteUser(areaId, { areaRepository });

    // Output
    return h.response().code(204);
  },
   */

};

