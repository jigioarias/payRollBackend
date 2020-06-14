    'use strict';

const Boom = require('@hapi/boom');
const ResponseSerializer = require('../serializers/ResponseSerializer');
const ListEmpleadosClaseNomina = require('../../application_business_rules/use_cases/ListEmpleadosClaseNomina');
const ListConceptoClaseNomina = require('../../application_business_rules/use_cases/ListConceptoClaseNomina');
const ListParametroDescripcion = require('../../application_business_rules/use_cases/ListParametroDescripcion');
const CreateNomina = require('../../application_business_rules/use_cases/CreateNomina');
const RemoveNomina = require('../../application_business_rules/use_cases/RemoveNomina');


const PayRollRules = require('../../application_business_rules/use_cases/PayRollRules');
const Response = require('../../application_business_rules/use_cases/Response');
const Fecha  = require('../../enterprise_business_rules/entities/Fecha');


const ConceptoNominaRepository = require('../../application_business_rules/repositories/ConcepNominaRepository');
const ConceptoNominaRepositorySQL = require('../storage/ConceptoNominaRepositoryMYSQL');
const conceptoNominaRepository = new ConceptoNominaRepository(new ConceptoNominaRepositorySQL());

const EmpleadoRepository = require('../../application_business_rules/repositories/EmpleadoRepository');
const EmpleadoRepositoryMySQL = require('../storage/EmpleadoRepositoryMYSQL');
const empleadoRepository = new EmpleadoRepository(new EmpleadoRepositoryMySQL());

const PersonaRepository = require('../../application_business_rules/repositories/PersonaRepository');
const PersonaRepositorySQL = require('../storage/PersonaRepositoryMYSQL');
const personaRepository = new PersonaRepository(new PersonaRepositorySQL());


const ConceptoRepository = require('../../application_business_rules/repositories/ConceptoRepository');
const ConceptoRepositorySQL = require('../storage/ConceptoRepositoryMYSQL');
const conceptoRepository = new ConceptoRepository(new ConceptoRepositorySQL());


const ParametroRepository = require('../../application_business_rules/repositories/ParametroRepository');
const ParametroRepositorySQL = require('../storage/ParametroRepositoryMYSQL');
const parametroRepository = new ParametroRepository(new ParametroRepositorySQL());



const NominaRepository = require('../../application_business_rules/repositories/NominaRepository');
const NominaRepositoryMySQL = require('../storage/NominaRepositoryMYSQL');
const nominaRepository = new NominaRepository(new NominaRepositoryMySQL());

module.exports = {
  async createNomina(request) {

    let response = null;
    const responseSerializer = new ResponseSerializer();

    try {


      const claseId =request.payload.classPayRoll.id;
      const empresaId = request.payload.enterprise;
      const activeClassPayRoll = request.payload.active;
      const periodValue =  request.payload.period.period+ request.payload.period.month+request.payload.period.year;
      const user = request.payload.user;
      
      
      
      
      let empleados = await ListEmpleadosClaseNomina(empresaId,activeClassPayRoll,claseId, { empleadoRepository },{personaRepository});
      
      let conceptosNominaBasicos = await ListConceptoClaseNomina(empresaId,claseId,activeClassPayRoll, { conceptoNominaRepository },{conceptoRepository});
      let valorAuxilio = await ListParametroDescripcion(empresaId,'valorAuxilioTransporte',{parametroRepository});
      let valorSalarioTransporte = await ListParametroDescripcion(empresaId,'valorSalarioTransporte',{parametroRepository});
      let conceptoAuxilioTransporte = await ListParametroDescripcion(empresaId,'conceptoAuxilioTransporte',{parametroRepository});
      let borrarNomina = await RemoveNomina( empresaId,claseId,periodValue,'P', { nominaRepository });



   

      
      let dias = 0;
 
      const fechaInicioPeriodo = new Date(request.payload.period.initDate);
      const fechaFinPeriodo = new Date(request.payload.period.endDate);
      let fechaInicioContrato = null;
      let fechaFinContrato = null;
      let salario =0;
      let salarioTotal = 0;
      let salarioEmpleado = 0;
      let auxilioTransporte = 0;
      let listPayRoll= [];

      if(empleados != null){
          for ( let empleado of empleados) {
            
            fechaInicioContrato =  new Date(empleado.employee.initDateContract);
            fechaFinContrato = new Date(empleado.employee.endDateContract);
            salarioTotal =  empleado.employee.salary;
            auxilioTransporte =0;
            dias =PayRollRules.calcularDiasNomina(fechaInicioContrato,fechaFinContrato,fechaInicioPeriodo,fechaFinPeriodo);

            
            salario = (salarioTotal /30)* dias ;
          
            
            let salarioEmpleado = 0;
           
           if(conceptosNominaBasicos != null){
            for(let iconcepto of conceptosNominaBasicos ){

              let valorConcepto = PayRollRules.calcularConceptoBasicosNomina(salario,iconcepto);
                          
              salarioEmpleado =   salarioEmpleado  + valorConcepto;
        

                let nominaRegistro =  await CreateNomina(
                  empresaId,
                  request.payload.classPayRoll.id,
                  empleado.employee.id,
                  empleado.person.document,
                  empleado.person.firstName + ' '+ empleado.person.lastName,
                  empleado.person.address,
                  empleado.person.email,
                  empleado.person.phone,
                  periodValue,
                  iconcepto.id,
                  iconcepto.description,
                  valorConcepto,
                  ((iconcepto.percentaje==null)?iconcepto.value:iconcepto.percentaje),
                  iconcepto.fittype,
                  fechaInicioPeriodo,
                  fechaFinPeriodo,
                  'P',
                  user,
                  { nominaRepository});
      
                  listPayRoll.push(nominaRegistro);
                

            }
          }
      
            salario = salario +salarioEmpleado;

            console.log('parametro',empleado.employee.transporteSubsidy,salarioTotal,30,dias,valorAuxilio.value,valorSalarioTransporte.value);
            auxilioTransporte =   PayRollRules.calcularAuxilioTransporte(empleado.employee.transporteSubsidy,salarioTotal,30,dias,valorAuxilio.value,valorSalarioTransporte.value);
             if(auxilioTransporte > 0 ){
              
              console.log(' entro empleados',empleado.employee.id);
           
           
              
           
              let  conceptoAuxilio =  await CreateNomina(
                  request.payload.enterprise,
                  request.payload.classPayRoll.id,
                  empleado.employee.id,
                  empleado.person.document,
                  empleado.person.firstName + ' '+ empleado.person.lastName,
                  empleado.person.address,
                  empleado.person.email,
                  empleado.person.phone,
                  periodValue,
                  conceptoAuxilioTransporte.value,
                  'Auxilio Transporte',
                  auxilioTransporte,
                  0,
                  'S',
                  fechaInicioPeriodo,
                  fechaFinPeriodo,
                  'P',
                  user,{ nominaRepository});

              

                  console.log(conceptoAuxilio);
                  listPayRoll.push(conceptoAuxilio);
                
            }
            
            salario = salario + auxilioTransporte
          }
      
    }
             
         
      response = new Response(listPayRoll, 'OK', '');
      return responseSerializer.serialize(response);

    } catch (err) {
      console.log('errrrooorr',error);
      response = new Response(null, 'Error', err);
      return responseSerializer.serialize(response);
    }


  },




};
