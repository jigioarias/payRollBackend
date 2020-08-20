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
const GetVacacionesNominaEmpleado = require('../../application_business_rules/use_cases/GetVacacionesNominaEmpleado');
const RemoveNovedadNominaEmpleadoConcepto = require('../../application_business_rules/use_cases/RemoveNovedadNominaEmpleadoConcepto');
//const GetVacionesEmpleado =  require('../../application_business_rules/use_cases/GetVacacionesEmpleado');


const  calcularAuxilioTransporte  = require('../../application_business_rules/use_cases/PayRollRules');



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
const prestacionSocialRepository = new PrestacionSocialRepository(new PrestacionSocialRepositoryMySQL());

const VacacionRepository = require('../../application_business_rules/repositories/VacacionRepository');
const  VacacionRepositorySQL = require('../storage/VacacionRepositoryMYSQL');
const CreateNovedadNominaEmpleado = require('../../application_business_rules/use_cases/CreateNovedadNominaEmpleado');
const vacacionRepository = new VacacionRepository(new VacacionRepositorySQL());





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
      const endDatePeriod = request.payload.period.endDate;
      const initDatePeriod = request.payload.period.initDate;
      const yearPeriod = request.payload.period.year;
      const user = request.payload.user;
      let listaDetalleNomina =[];
      let listaNomina = [];
      let listaNovedadesNomina = [];
      let listaNovedadesEmpleado =  null;
      
      
      
      let empleados = await ListEmpleadosClaseNomina(empresaId,activeClassPayRoll,claseId, { empleadoRepository },{personaRepository});
      let conceptosNominaBasicos = await ListConceptoClaseNomina(empresaId,claseId,activeClassPayRoll, { conceptoNominaRepository },{conceptoRepository});
      let valorAuxilio = await ListParametroDescripcion(empresaId,'valorAuxilioTransporte',{parametroRepository});
      let valorSalarioTransporte = await ListParametroDescripcion(empresaId,'valorSalarioTransporte',{parametroRepository});
      let conceptoAuxilioTransporte = await ListParametroDescripcion(empresaId,'conceptoAuxilioTransporte',{parametroRepository});
      let borrarNomina = await RemoveNomina( empresaId,claseId,periodValue,'P', { nominaRepository },{detalleNominaRepository});
      let borrarPrestacionSocial= await RemovePrestacionSocial( empresaId,claseId,periodValue,'P', { prestacionSocialRepository });
      //TODO BORRAR NOVEDADES DE VACACIONES, LICENCIAS Y OTROS
      let conceptoDiasVacaciones = await ListParametroDescripcion(request.payload.enterprise,'conceptoVacacionesSalario',{parametroRepository});
      let removeConceptoVacaciones = await RemoveNovedadNominaEmpleadoConcepto(  empresaId,claseId,conceptoDiasVacaciones.value,periodValue,{novedadNominaRepository});


      let getDiasVacacionesNominaEmpleado = null;
      let guardarNovedadVacacion = null;
      let valorSalarioVacaciones = 0;

   

      
      let dias = 0;
 
      const fechaInicioPeriodo = new Date(request.payload.period.initDate);
      const fechaFinPeriodo = new Date(request.payload.period.endDate);
      let fechaInicioContrato = null;
      let fechaFinContrato = null;
      let salario =0;
      let salarioPeriodo = 0;
      let salarioTotal = 0;
      let auxilioTransporte = 0;
      let mominaRegistro = null;
      let salarioNovedadesEmpleado = 0;
      let salarioConceptosEmpleado = 0;

      if(empleados != null){
          for ( let empleado of empleados) {
            
            fechaInicioContrato =  new Date(empleado.employee.initDateContract);
            fechaFinContrato = new Date(empleado.employee.endDateContract);
            salarioTotal =  empleado.employee.salary;
            auxilioTransporte =0;
            dias =PayRollRules.calcularDiasNomina(fechaInicioContrato,fechaFinContrato,fechaInicioPeriodo,fechaFinPeriodo);
            getDiasVacacionesNominaEmpleado = await GetVacacionesNominaEmpleado(empresaId,empleado.employee.id,empleado.person.document,yearPeriod, periodValue,request.payload.classPayRoll.id,initDatePeriod,endDatePeriod,{vacacionRepository})
            
            console.log(getDiasVacacionesNominaEmpleado);
            dias = dias - getDiasVacacionesNominaEmpleado;
            
            valorSalarioVacaciones = (salarioTotal /diasNomina)* getDiasVacacionesNominaEmpleado ;
            //console.log('dias a pagar',dias);
            //console.log(diasNomina);
            salario = (salarioTotal /diasNomina)* (dias) ;
            //console.log('valor salario>>>>',valorSalarioVacaciones);
           
            salarioPeriodo = salario;
            
             salarioConceptosEmpleado= 0;
           
           if(conceptosNominaBasicos != null){

            let valorConcepto =0; 
            let detalleNominaRegistro = null;
            for(let iconcepto of conceptosNominaBasicos ){

                 valorConcepto = PayRollRules.calcularConceptoBasicosNomina(salario+valorSalarioVacaciones,iconcepto);
                          
                 salarioConceptosEmpleado =   salarioConceptosEmpleado  + valorConcepto;
                 

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
      
           // salario = salario +salarioConceptosEmpleado;
           // console.log('salario con conceptos',salario);
            auxilioTransporte =   PayRollRules.calcularAuxilioTransporte(empleado.employee.transporteSubsidy,salarioTotal,diasNomina,dias,valorAuxilio.value,valorSalarioTransporte.value);


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
           
            //salario = salario + auxilioTransporte
            console.log('salario con transporte',salario);
            listaNovedadesEmpleado = await ListNovedadesNominaEmpleado(empresaId,claseId,periodValue,empleado.employee.id,{novedadNominaRepository})
            salarioNovedadesEmpleado = 0;
            listaNovedadesEmpleado.forEach(novedad => {
              
              salarioNovedadesEmpleado = salarioNovedadesEmpleado + novedad.valor;
            
            });
            
             
            //console.log('salario con conceptos',salarioConceptosEmpleado);  
            //console.log('salario novedades',salarioNovedadesEmpleado);  
            //console.log ('salario trabajo',salario);
            //console.log('auxilio',auxilioTransporte);
            salario = salario +salarioConceptosEmpleado+salarioNovedadesEmpleado+auxilioTransporte ;

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
              salarioPeriodo,
              salarioTotal,
              fechaInicioPeriodo,
              fechaFinPeriodo,
              'P',
              dias,
              user,
              );
              listaNomina.push(mominaRegistro);

              if(getDiasVacacionesNominaEmpleado >0){

                guardarNovedadVacacion = await CreateNovedadNominaEmpleado(
                  empresaId,
                  request.payload.classPayRoll.id,
                  empleado.employee.id,
                  empleado.person.document,
                  conceptoDiasVacaciones.value,
                  periodValue,
                  valorSalarioVacaciones,
                  getDiasVacacionesNominaEmpleado* request.payload.classPayRoll.dayshours, 
                  fechaInicioPeriodo,
                  fechaFinPeriodo,
                  user,
                  'R',
                  {novedadNominaRepository}
                  );

                  listaNovedadesEmpleado.push(guardarNovedadVacacion);
              }
          }
            if(listaNovedadesEmpleado.length>0)
            {
              listaNovedadesEmpleado.forEach(element => {
                listaNovedadesNomina.push(element);
              });
            }
        }
      
    let listPayRollDTO = await CreateNomina(listaNovedadesNomina,listaNomina,listaDetalleNomina,{nominaRepository},{detalleNominaRepository});
    //console.log(listPayRollDTO);
    const calcularPrestaciones = await CreatePrestacionSOcial(listPayRollDTO,tipoPeriodoNomina,'N',{prestacionSocialRepository});
     
     response = new Response(listPayRollDTO, calcularAuxilioTransporte, '');
      return responseSerializer.serialize(response);

    } catch (err) {
      console.log('errrrooorr',err);
      response = new Response(null, 'Error', err);
      return responseSerializer.serialize(response);
    }


  },




};
