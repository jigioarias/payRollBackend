'use strict';

const Boom = require('@hapi/boom');
const ResponseSerializer = require('../serializers/ResponseSerializer');

const ListConceptoNominas = require('../../application_business_rules/use_cases/ListConceptoNominas');
const CreateConceptoNomina = require('../../application_business_rules/use_cases/CreateConceptoNomina');
const GetConceptoNomina = require('../../application_business_rules/use_cases/GetConceptoNomina');
const UpdateConceptoNomina = require('../../application_business_rules/use_cases/UpdateConceptoNomina');

const Response = require('../../application_business_rules/use_cases/Response');
const ConceptoNominaRepository = require('../../application_business_rules/repositories/ConcepNominaRepository');
const ConceptoNominaRepositorySQL = require('../storage/ConceptoNominaRepositoryMYSQL');
const { CONCEPTO_NOMINA_NO_EXISTE } = require('../../application_business_rules/use_cases/constantesValidacion');
const conceptoNominaRepository = new ConceptoNominaRepository(new ConceptoNominaRepositorySQL());


module.exports = {

  async create(request) {
    let response =null;
    let responseSerializer = null;
    try {
           const ConceptoNomina = await CreateConceptoNomina( request.payload.enterprise, request.payload.clase, request.payload.concept,request.payload.active,request.payload.user, { conceptoNominaRepository });
          // Output
          response =new Response(periodoClase,'OK','');
          responseSerializer = new ResponseSerializer();

  } catch (error) {
     response =new Response(null,'ERROR',error);
    responseSerializer = new ResponseSerializer();
    
   }
  
   return responseSerializer.serialize(response);
  
  },

  async find(request) {

    // Treatment
    const ConceptoNominas = await ListConceptoNominas(request.payload.enterprise, { conceptoNominaRepository });

    // Output
    const response =new Response(ConceptoNominas,'OK','');
    const responseSerializer = new ResponseSerializer();
    return responseSerializer.serialize(response);
  
  },

  async update(request) {

    let response =null;
    let responseSerializer = null;
    try {
      
  
    // Treatment
    const conceptoNomina =  await UpdateConceptoNomina (request.payload.id, 
                                                            request.payload.enterprise, 
                                                            request.payload.clase, 
                                                            request.payload.concept,
                                                            request.payload.active,
                                                            request.payload.user, 
                                                            { conceptoNominaRepository });

    // Output
     response =new Response(conceptoNomina,'OK',conceptoNomina.error);
     responseSerializer = new ResponseSerializer();

  } catch (error) {
    console.log(error);
     response =new Response(null,'ERROR',error);
     responseSerializer = new ResponseSerializer();
      
  }
  return responseSerializer.serialize(response);

  },


  async get(request) {

    let response = null;
    let responseSerializer = null;
  try {
  
    const id = request.params.id;
    // Treatment
    const conceptoNomina = await GetConceptoNomina(id, { conceptoNominaRepository });

    // Output
    if (!conceptoNomina) {
      response =new Response(conceptoNomina,'OK',CONCEPTO_NOMINA_NO_EXISTE);
      responseSerializer = new ResponseSerializer();      
    }else{
        // Output
         response =new Response(conceptoNomina,'OK','');
         responseSerializer = new ResponseSerializer();
    }
  } catch (error) {
    console.log(error);
    response =new Response(null,'ERROR',error);
    responseSerializer = new ResponseSerializer();
  }
  return responseSerializer.serialize(response);

  },


};

