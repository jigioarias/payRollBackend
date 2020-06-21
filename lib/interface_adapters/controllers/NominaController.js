    'use strict';

const Boom = require('@hapi/boom');
const ResponseSerializer = require('../serializers/ResponseSerializer');

const Nomina = require('../../enterprise_business_rules/entities/Nomina');
const DetalleNomina = require('../../enterprise_business_rules/entities/DetalleNomina');


const ListEmpleadosClaseNomina = require('../../application_business_rules/use_cases/ListEmpleadosClaseNomina');
const ListNovedadesNominaEmpleado = require('../../application_business_rules/use_cases/ListNovedadesNominaEmpleado');
const ListConceptoClaseNomina = require('../../application_business_rules/use_cases/ListConceptoClaseNomina');
const ListParametroDescripcion = require('../../application_business_rules/use_cases/ListParametroDescripcion');
const CreateNomina = require('../../application_business_rules/use_cases/CreateNomina');
const RemoveNomina = require('../../application_business_rules/use_cases/RemoveNomina');
const RemovePrestacionSocial = require('../../application_business_rules/use_cases/RemovePrestacionSocial');
const CreatePrestacionSOcial = require('../../application_business_rules/use_cases/CreatePrestacionSocial');



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


const DetalleNominaRepository = require('../../application_business_rules/repositories/DetalleNominaRepository');
const DetalleNominaRepositoryMySQL = require('../storage/DetalleNominaRepositoryMYSQL');
const detalleNominaRepository = new DetalleNominaRepository(new DetalleNominaRepositoryMySQL());

const NovedadNominaRepository = require('../../application_business_rules/repositories/NovedadNominaRepository');
const NovedadNominaRepositoryMySQL = require('../storage/NovedadNominaRepositoryMYSQL');
const novedadNominaRepository = new NovedadNominaRepository(new NovedadNominaRepositoryMySQL());


const PrestacionSocialRepository = require('../../application_business_rules/repositories/PrestacionSocialRepository');
const PrestacionSocialRepositoryMySQL = require('../storage/PrestacionSocialRepositoryMYSQL');
const { calcularAuxilioTransporte } = require('../../application_business_rules/use_cases/PayRollRules');
const prestacionSocialRepository = new PrestacionSocialRepository(new PrestacionSocialRepositoryMySQL());


module.exports = {
  async createNomina(request) {

    let response = null;
    const responseSerializer = new ResponseSerializer();

    try {


      const claseId =request.payload.classPayRoll.id;
      const empresaId = request.payload.enterprise;
      const activeClassPayRoll = request.payload.active;
      const diasNomina = (request.payload.payrolltype=='J')?31:30;
      const tipoPeriodoNomina = (request.payload.periodType==null)?2:request.payload.periodType;

      const periodValue =  request.payload.period.period+ request.payload.period.month+request.payload.period.year;
      const user = request.payload.user;
      let listaDetalleNomina =[];
      let listaNomina = [];
      
      
      
      let empleados = await ListEmpleadosClaseNomina(empresaId,activeClassPayRoll,claseId, { empleadoRepository },{personaRepository});
      let conceptosNominaBasicos = await ListConceptoClaseNomina(empresaId,claseId,activeClassPayRoll, { conceptoNominaRepository },{conceptoRepository});
      let valorAuxilio = await ListParametroDescripcion(empresaId,'valorAuxilioTransporte',{parametroRepository});
      let valorSalarioTransporte = await ListParametroDescripcion(empresaId,'valorSalarioTransporte',{parametroRepository});
      let conceptoAuxilioTransporte = await ListParametroDescripcion(empresaId,'conceptoAuxilioTransporte',{parametroRepository});
      let borrarNomina = await RemoveNomina( empresaId,claseId,periodValue,'P', { nominaRepository },{detalleNominaRepository});
      let borrarPrestacionSocial= await RemovePrestacionSocial( empresaId,claseId,periodValue,'P', { prestacionSocialRepository });
      let listaNovedadesEmpleado = null;

   

      
      let dias = 0;
 
      const fechaInicioPeriodo = new Date(request.payload.period.initDate);
      const fechaFinPeriodo = new Date(request.payload.period.endDate);
      let fechaInicioContrato = null;
      let fechaFinContrato = null;
      let salario =0;
      let salarioMensual = 0;
      let salarioTotal = 0;
      let salarioEmpleado = 0;
      let auxilioTransporte = 0;
      let mominaRegistro = null;

      if(empleados != null){
          for ( let empleado of empleados) {
            
            fechaInicioContrato =  new Date(empleado.employee.initDateContract);
            fechaFinContrato = new Date(empleado.employee.endDateContract);
            salarioTotal =  empleado.employee.salary;
            auxilioTransporte =0;
            dias =PayRollRules.calcularDiasNomina(fechaInicioContrato,fechaFinContrato,fechaInicioPeriodo,fechaFinPeriodo);
            
            salario = (salarioTotal /diasNomina)* dias ;
            salarioMensual = salario;
            
            let salarioEmpleado = 0;
           
           if(conceptosNominaBasicos != null){

            let valorConcepto =0; 
            let detalleNominaRegistro = null;
            for(let iconcepto of conceptosNominaBasicos ){

                 valorConcepto = PayRollRules.calcularConceptoBasicosNomina(salario,iconcepto);
                          
                 salarioEmpleado =   salarioEmpleado  + valorConcepto;
        

                 detalleNominaRegistro = new DetalleNomina(
                  null,
                  empresaId,
                  null,
                  empleado.employee.id,
                  iconcepto.id,
                  periodValue,
                  iconcepto.description,
                  valorConcepto,
                  ((iconcepto.percentaje==null)?iconcepto.value:iconcepto.percentaje),
                  iconcepto.fittype,
                  'P',
                  user,
                  );
                  
                  listaDetalleNomina.push(detalleNominaRegistro)
                

            }
          }
      
            salario = salario +salarioEmpleado;
            auxilioTransporte =   PayRollRules.calcularAuxilioTransporte(empleado.employee.transporteSubsidy,salarioTotal,30,dias,valorAuxilio.value,valorSalarioTransporte.value);

            if(auxilioTransporte > 0 ){
           
              let  conceptoAuxilio = new DetalleNomina(
                  null,
                  empresaId,
                  null,
                  empleado.employee.id,
                  conceptoAuxilioTransporte.value,
                  periodValue,
                  'Auxilio Transporte',
                  auxilioTransporte,
                  0,
                  'S',
                  'P',
                  user);

                  listaDetalleNomina.push(conceptoAuxilio);
                
            }
            
            salario = salario + auxilioTransporte

            listaNovedadesEmpleado = await ListNovedadesNominaEmpleado(empresaId,claseId,periodValue,empleado.employee.id,{novedadNominaRepository})
            

            mominaRegistro = new Nomina(
              null,
              empresaId,
              request.payload.classPayRoll.id,
              empleado.employee.id,
              empleado.person.document,
              empleado.person.firstName + ' '+ empleado.person.lastName,
              empleado.person.address,
              empleado.person.email,
              empleado.person.phone,
              periodValue,
              salario,
              salarioMensual,
              salarioTotal,
              fechaInicioPeriodo,
              fechaFinPeriodo,
              'P',
              dias,
              user,
              );
              listaNomina.push(mominaRegistro);

          }
      
    }
      
    
     const listPayRollDTO = await CreateNomina(listaNomina,listaDetalleNomina,{nominaRepository},{detalleNominaRepository});
     
     const calcularPrestaciones = await CreatePrestacionSOcial(listPayRollDTO,tipoPeriodoNomina,{prestacionSocialRepository});
              
     
     
     response = new Response(listPayRollDTO, calcularAuxilioTransporte, '');
      return responseSerializer.serialize(response);

    } catch (err) {
      console.log('errrrooorr',err);
      response = new Response(null, 'Error', err);
      return responseSerializer.serialize(response);
    }


  },




};
