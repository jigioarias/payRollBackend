'use strict';

const Boom = require('@hapi/boom');
const ResponseSerializer = require('../serializers/ResponseSerializer');

const ListConceptos = require('../../application_business_rules/use_cases/ListConceptos');
const ListConceptosByType = require('../../application_business_rules/use_cases/ListConceptosNovedad');
const CreateConcepto = require('../../application_business_rules/use_cases/CreateConcepto');
const ListConceptosxIds = require('../../application_business_rules/use_cases/ListConceptosxIds');

const ConceptoRepository = require('../../application_business_rules/repositories/ConceptoRepository');
const Response = require('../../application_business_rules/use_cases/Response');
const ConceptoRepositorySQL = require('../storage/ConceptoRepositoryMYSQL');
const conceptoRepository = new ConceptoRepository(new ConceptoRepositorySQL());


module.exports = {

  async createConcepto(request) {
   //enterprise, code, description, fittype,accountingcode,,user

    // Treatment
    const Concepto = await CreateConcepto( request.payload.enterprise, request.payload.code, request.payload.description,
        request.payload.fittype,request.payload.accountingcode ,request.payload.conceptType,request.payload.user,value,percentaje,{ conceptoRepository });

   // Output
    const response =new Response(Concepto,'OK','');
    const responseSerializer = new ResponseSerializer();
    return responseSerializer.serialize(response);
  },

 async findConceptosByType(request) {

    // TreatmentconceptType
    const Conceptos = await ListConceptosByType(request.payload.enterprise,request.payload.conceptType,{ conceptoRepository });

    // Output
    const response =new Response(Conceptos,'OK','');
    const responseSerializer = new ResponseSerializer();
    return responseSerializer.serialize(response);
  
  },


  async findConceptos(request) {


    const enterprise = request.payload.enterprise;

    const Conceptos = await ListConceptos(enterprise,{ conceptoRepository });

    // Output
    const response =new Response(Conceptos,'OK','');
    const responseSerializer = new ResponseSerializer();
    return responseSerializer.serialize(response);
  
  },
  async listConceptosXIds(request) {

    const Conceptos = await ListConceptosxIds(request.payload,{ conceptoRepository });

    // Output
    const response =new Response(Conceptos,'OK','');
    const responseSerializer = new ResponseSerializer();
    return responseSerializer.serialize(response);
  
  },
};

