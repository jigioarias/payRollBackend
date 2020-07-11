'use strict';

const Boom = require('@hapi/boom');
const ResponseSerializer = require('../serializers/ResponseSerializer');

const ListClaseNominas = require('../../application_business_rules/use_cases/ListClaseNominas');
const CreateClaseNomina = require('../../application_business_rules/use_cases/CreateClaseNomina');
const Response = require('../../application_business_rules/use_cases/Response');


const ClaseNonminaRepository = require('../../application_business_rules/repositories/ClaseNominaRepository');
const ClaseNominaRepositorySQL = require('../storage/ClaseNominaRepositoryMYSQL');
const claseNominaRepository = new ClaseNonminaRepository(new ClaseNominaRepositorySQL());


module.exports = {

  async createClaseNomina(request) {

    // Input
    const {  enterprise, clase, description, vacationDays,vacationPrima,primatype,provisionservicedays,provisionservicetype,payrolltype,monthhours,dayshours,bank,bankbranch,account,user } = request.payload;

    console.log(request.payload.vacationdays,request.payload.vacationprima);

    // Treatment
    const claseNomina = await CreateClaseNomina( request.payload.enterprise, request.payload.clase, request.payload.description,request.payload.vacationdays,request.payload.vacationprima,
      request.payload.primatype,request.payload.provisionservicedays,request.payload.provisionservicetype,request.payload.payrolltype,
      request.payload.monthhours,request.payload.dayshours,request.payload.bank,request.payload.bankbranch,request.payload.account,
      request.payload.user,request.payload.workweek,request.payload.periodType, { claseNominaRepository });



    // Output
    const response =new Response(claseNomina,'OK','');
    const responseSerializer = new ResponseSerializer();
    return responseSerializer.serialize(response);
  },

  async findClaseNominas() {

    // Treatment
    const claseNominas = await ListClaseNominas({ claseNominaRepository });

    // Output
    const response =new Response(claseNominas,'OK','');
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

