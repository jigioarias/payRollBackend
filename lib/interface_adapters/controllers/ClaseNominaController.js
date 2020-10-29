'use strict';

const Boom = require('@hapi/boom');
const ResponseSerializer = require('../serializers/ResponseSerializer');

const ListClaseNominas = require('../../application_business_rules/use_cases/ListClaseNominas');
const CreateClaseNomina = require('../../application_business_rules/use_cases/CreateClaseNomina');
const Response = require('../../application_business_rules/use_cases/Response');
const GetClaseNomina = require('../../application_business_rules/use_cases/GetClaseNomina');


const ClaseNonminaRepository = require('../../application_business_rules/repositories/ClaseNominaRepository');
const ClaseNominaRepositorySQL = require('../storage/ClaseNominaRepositoryMYSQL');
const { CLASE_NOMINA_NO_EXISTE } = require('../../application_business_rules/use_cases/constantesValidacion');
const UpdateClaseNomina = require('../../application_business_rules/use_cases/UpdateClaseNomina');
const claseNominaRepository = new ClaseNonminaRepository(new ClaseNominaRepositorySQL());


module.exports = {

  async create(request) {

    let response =null;
    let responseSerializer = null;
    try {
 
    // Input
    const {  enterprise, clase, description, vacationDays,vacationPrima,primatype,provisionservicedays,provisionservicetype,payrolltype,monthhours,dayshours,bank,bankbranch,account,user } = request.payload;

   // Treatment
    const claseNomina = await CreateClaseNomina( request.payload.enterprise, request.payload.clase, request.payload.description,request.payload.vacationdays,request.payload.vacationprima,
      request.payload.primatype,request.payload.provisionservicedays,request.payload.provisionservicetype,request.payload.payrolltype,
      request.payload.monthhours,request.payload.dayshours,request.payload.bank,request.payload.bankbranch,request.payload.account,
      request.payload.user,request.payload.workweek,request.payload.periodType,request.payload.active, { claseNominaRepository });

    // Output
     response =new Response(claseNomina,'OK',claseNomina.error);
     responseSerializer = new ResponseSerializer();

  } catch (error) {
    console.log(error);
    response =new Response(null,'ERROR',error);
    responseSerializer = new ResponseSerializer();
     
  }
  return responseSerializer.serialize(response);

  },


  async find() {

    // Treatment
    const claseNominas = await ListClaseNominas({ claseNominaRepository });

    // Output
    const response =new Response(claseNominas,'OK','');
    const responseSerializer = new ResponseSerializer();
    return responseSerializer.serialize(response);
  
  },

  
  async get(request) {

    let response = null;
    let responseSerializer = null;
  try {
  
    const id = request.params.id;
    console.log('ID CLASE DE NOMINA',id);
    // Treatment
    const claseNomina = await GetClaseNomina(id, { claseNominaRepository });

    // Output
    if (!claseNomina) {
      response =new Response(claseNomina,'OK',CLASE_NOMINA_NO_EXISTE);
      responseSerializer = new ResponseSerializer();      
    }else{
        // Output
         response =new Response(claseNomina,'OK','');
         responseSerializer = new ResponseSerializer();
    }
  } catch (error) {
  
  }
  return responseSerializer.serialize(response);

  },

  async update(request) {

    let response =null;
    let responseSerializer = null;
    try {
 
   // Treatment
    const claseNomina = await UpdateClaseNomina(request.payload.id, request.payload.enterprise, request.payload.clase, request.payload.description,request.payload.vacationdays,request.payload.vacationprima,
      request.payload.primatype,request.payload.provisionservicedays,request.payload.provisionservicetype,request.payload.payrolltype,
      request.payload.monthhours,request.payload.dayshours,request.payload.bank,request.payload.bankbranch,request.payload.account,
      request.payload.user,request.payload.workweek,request.payload.periodType,request.payload.active, { claseNominaRepository });

    // Output
     response =new Response(claseNomina,'OK',claseNomina.error);
     responseSerializer = new ResponseSerializer();

  } catch (error) {
    console.log(error);
    response =new Response(null,'ERROR',error);
    responseSerializer = new ResponseSerializer();
     
  }
  return responseSerializer.serialize(response);

  },

  /*async deleteArea(request, h) {

    // Input
    const areaId = request.params.id;

    // Treatment
    await DeleteUser(areaId, { areaRepository });

    // Output
    return h.response().code(204);
  },
   */

};

