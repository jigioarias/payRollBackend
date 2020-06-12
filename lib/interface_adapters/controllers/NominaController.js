    'use strict';

const Boom = require('@hapi/boom');
const ResponseSerializer = require('../serializers/ResponseSerializer');
const ListEmpleadosClaseNomina = require('../../application_business_rules/use_cases/ListEmpleadosClaseNomina');
const ListConceptoClaseNomina = require('../../application_business_rules/use_cases/ListConceptoClaseNomina');
const ListParametroDescripcion = require('../../application_business_rules/use_cases/ListParametroDescripcion');

const PayRollRules = require('../../application_business_rules/use_cases/PayRollRules');
const Response = require('../../application_business_rules/use_cases/Response');
const Fecha  = require('../../enterprise_business_rules/entities/Fecha');


const ConceptoNominaRepository = require('../../application_business_rules/repositories/ConcepNominaRepository');
const ConceptoNominaRepositorySQL = require('../storage/ConceptoNominaRepositoryMYSQL');
const conceptoNominaRepository = new ConceptoNominaRepository(new ConceptoNominaRepositorySQL());

const EmpleadoRepository = require('../../application_business_rules/repositories/EmpleadoRepository');
const EmpleadoRepositoryMySQL = require('../storage/EmpleadoRepositoryMYSQL');
const empleadoRepository = new EmpleadoRepository(new EmpleadoRepositoryMySQL());

const ConceptoRepository = require('../../application_business_rules/repositories/ConceptoRepository');
const ConceptoRepositorySQL = require('../storage/ConceptoRepositoryMYSQL');
const conceptoRepository = new ConceptoRepository(new ConceptoRepositorySQL());


const ParametroRepository = require('../../application_business_rules/repositories/ParametroRepository');
const ParametroRepositorySQL = require('../storage/ParametroRepositoryMYSQL');
const parametroRepository = new ParametroRepository(new ParametroRepositorySQL());


module.exports = {
  async createNomina(request) {

    let response = null;
    const responseSerializer = new ResponseSerializer();

    try {


      let empleados = await ListEmpleadosClaseNomina(request.payload.enterprise,request.payload.active,request.payload.classPayRoll.id, { empleadoRepository });
      let conceptosNominaBasicos = await ListConceptoClaseNomina(request.payload.enterprise,request.payload.classPayRoll.id,request.payload.active, { conceptoNominaRepository },{conceptoRepository});
      let auxilioObject = await ListParametroDescripcion(request.payload.enterprise,'valorAuxilioTransporte',{parametroRepository});
      let salarioTransporteObject = await ListParametroDescripcion(request.payload.enterprise,'valorSalarioTransporte',{parametroRepository});
      let valorAuxilio = 0;
      let valorSalarioTransporte = 0;
      if(auxilioObject != null){
        valorAuxilio = auxilioObject[0].value;
      }
      if(salarioTransporteObject!= null){
        valorSalarioTransporte = salarioTransporteObject[0].value;
      }
      console.log('valor aux',valorAuxilio);
      let dias = 0;
 
      let fechaInicioPeriodo = new Date(request.payload.period.initDate);
      let fechaFinPeriodo = new Date(request.payload.period.endDate);
      let fechaInicioContrato = null;
      let fechaFinContrato = null;
      let salario =0;
      let salarioTotal = 0;
      let salarioEmpleado = 0;
      let auxilioTransporte = 0;
    
      empleados.forEach(empleado => {
         
         fechaInicioContrato =  new Date(empleado.initDateContract);
         fechaFinContrato = new Date(empleado.endDateContract);
         salarioTotal =  empleado.salary;
         auxilioTransporte =0;
         dias =PayRollRules.calcularDiasNomina(fechaInicioContrato,fechaFinContrato,fechaInicioPeriodo,fechaFinPeriodo);

         
         salario = (salarioTotal /30)* dias ;
       
        
        salarioEmpleado =   PayRollRules.calcularConceptosBasicosNomina(salario,conceptosNominaBasicos);
        salario = salario +salarioEmpleado;

        
            
        auxilioTransporte =   PayRollRules.calcularAuxilioTransporte(empleado.transporteSubsidy,salarioTotal,30,dias,valorAuxilio,valorSalarioTransporte);



        salario = salario + auxilioTransporte
        
        console.log('auxilio',auxilioTransporte)
        console.log('salario>>>>>',salario);
        
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
