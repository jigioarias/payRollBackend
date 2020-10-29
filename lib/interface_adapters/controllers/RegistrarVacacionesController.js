    'use strict';

const Boom = require('@hapi/boom');
const ResponseSerializer = require('../serializers/ResponseSerializer');
const Response = require('../../application_business_rules/use_cases/Response');



const CreateNovedadNominaEmpleado = require('../../application_business_rules/use_cases/CreateNovedadNominaEmpleado');
const CreateVacacionEmpleado = require('../../application_business_rules/use_cases/CreateVacacionEmpleado');
const CreatePrestacionSocialVacacion = require('../../application_business_rules/use_cases/CreatePrestacionSocialVacacion');
const UpdateSolicitudVacacion = require('../../application_business_rules/use_cases/UpdateSolicitudVacacion');



const ListParametroDescripcion = require('../../application_business_rules/use_cases/ListParametroDescripcion');
const GetPeriodoSiguiente = require('../../application_business_rules/use_cases/getPeriodoSiguiente');
const getPeriodoAnterior = require('../../application_business_rules/use_cases/getPeriodoAnterior');


const ParametroRepository = require('../../application_business_rules/repositories/ParametroRepository');
const ParametroRepositorySQL = require('../storage/ParametroRepositoryMYSQL');
const parametroRepository = new ParametroRepository(new ParametroRepositorySQL());



const NovedadNominaRepository = require('../../application_business_rules/repositories/NovedadNominaRepository');
const NovedadNominaRepositoryMySQL = require('../storage/NovedadNominaRepositoryMYSQL');
const novedadNominaRepository = new NovedadNominaRepository(new NovedadNominaRepositoryMySQL());

const PeriodoClaseRepository = require('../../application_business_rules/repositories/PeriodoClaseRepository');
const PeriodoClaseRepositorySQL = require('../storage/PeriodoClaseRepositoryMYSQL');
const periodoClaseRepository = new PeriodoClaseRepository(new PeriodoClaseRepositorySQL());


const VacacionRepository = require('../../application_business_rules/repositories/VacacionRepository');
const  VacacionRepositorySQL = require('../storage/VacacionRepositoryMYSQL');
const vacacionRepository = new VacacionRepository(new VacacionRepositorySQL());


const PrestacionSocialRepository = require('../../application_business_rules/repositories/PrestacionSocialRepository');
const PrestacionSocialRepositoryMySQL = require('../storage/PrestacionSocialRepositoryMYSQL');
const prestacionSocialRepository = new PrestacionSocialRepository(new PrestacionSocialRepositoryMySQL());


const SolicitudVacacionRepository = require('../../application_business_rules/repositories/SolicitudVacacionRepository');
const SolicitudVacacionRepositoryMySQL = require('../storage/SolicitudVacacionRepositoryMYSQL');
const solicitudVacacionRepository = new SolicitudVacacionRepository(new SolicitudVacacionRepositoryMySQL());

const {DIAS_COMERCIAL,DIAS_JULIANO,CODIGO_DIAS_JULIANO,TIPO_AJUSTE_SUMA,NOVEDAD_APROBADA} =require('./constantesSistema')


module.exports = {
  async ingresar(request) {

    let response = null;
    const responseSerializer = new ResponseSerializer();
    let novedadDiasEnDinero =  null;
    let novedadDiasVacaciones = null;
    let periodo =request.payload.period.period+ request.payload.period.month+request.payload.period.year;
    const diasNomina = (request.payload.classPayRoll.payrolltype==CODIGO_DIAS_JULIANO)?DIAS_JULIANO:DIAS_COMERCIAL;
    let valorHora = (request.payload.salary/diasNomina)/request.payload.dayHours;
  
    const enterprise = request.payload.enterprise;
    const document = request.payload.document;
    const enjoyInitDate = request.payload.enjoyInitDate;
    const enjoyEndDate = request.payload.enjoyEndDate;
    const moneyDays =request.payload.moneyDays;
    const enjoyDays =  request.payload.enjoyDays;
    const remuneration = request.payload.remuneration;
    const user = request.payload.user;
    const employeeId = request.payload.employee;
    const year = request.payload.period.year;
    const clase = request.payload.classPayRoll.id;
    const salary = request.payload.salary;


    
    try {

   const active = true; 
   const  guardarVacacion = await CreateVacacionEmpleado(enterprise, document, enjoyInitDate, enjoyEndDate,moneyDays, remuneration,user,employeeId,year, periodo,clase,enjoyDays,salary,active, { vacacionRepository});
   

   if(guardarVacacion.id !=null){

       
       const guardarPrestacion = await  CreatePrestacionSocialVacacion(enterprise,clase,employeeId,document, periodo,((-1)*(enjoyDays+moneyDays)),salary, salary,request.payload.period.initDate, request.payload.period.endDate, user,'N' ,{prestacionSocialRepository});
       const actualizarSolicitud = await UpdateSolicitudVacacion(request.payload.vacationRequest,{solicitudVacacionRepository});


       if(request.payload.moneyDays)  {
      
        let conceptoDiasVacaciones = await ListParametroDescripcion(request.payload.enterprise,'conceptoDiasVacionesRemuneradas',{parametroRepository});
        let horasDiasDinero = request.payload.moneyDays * request.payload.dayHours;
        let valorHoraDiasVacaciones = horasDiasDinero * valorHora;
 
     
        novedadDiasEnDinero = await CreateNovedadNominaEmpleado(
                                                               request.payload.enterprise,
                                                               request.payload.classPayRoll.id,
                                                               request.payload.employee,
                                                               request.payload.document,
                                                               conceptoDiasVacaciones.value,
                                                               periodo,
                                                               valorHoraDiasVacaciones,
                                                               horasDiasDinero, 
                                                               request.payload.period.initDate,
                                                               request.payload.period.endDate,
                                                               request.payload.user,
                                                               TIPO_AJUSTE_SUMA,
                                                               NOVEDAD_APROBADA,
                                                               {novedadNominaRepository}
         );
       
       }
       if(request.payload.remuneration){
 
    
           
        let conceptoVacaciones = await ListParametroDescripcion(request.payload.enterprise,'conceptoVacacionesRemuneradas',{parametroRepository});
        let horasDiasVacaciones = request.payload.enjoyDays * request.payload.dayHours;
        let valorHoraVacaciones = horasDiasVacaciones * valorHora;
 
         novedadDiasVacaciones = await CreateNovedadNominaEmpleado(
           request.payload.enterprise,
           request.payload.classPayRoll.id,
           request.payload.employee,
           request.payload.document,
           conceptoVacaciones.value,
           periodo,
           valorHoraVacaciones,
           horasDiasVacaciones, 
           request.payload.period.initDate,
           request.payload.period.endDate,
           request.payload.user,
           TIPO_AJUSTE_SUMA,
           NOVEDAD_APROBADA,
           {novedadNominaRepository}
           );
 
       }

          
    }

   // const periodoCLase = await GetPeriodoSiguiente(request.payload.period,request.payload.classPayRoll,{ periodoClaseRepository });

    
  //const periodoCLaseAnterior = await getPeriodoAnterior(request.payload.period,request.payload.classPayRoll,{ periodoClaseRepository });

    

    

     
     response = new Response(novedadDiasEnDinero,'OK', '');
      return responseSerializer.serialize(response);

    } catch (err) {
      console.log('errrrooorr',err);
      response = new Response(null, 'Error', err);
      return responseSerializer.serialize(response);
    }


  },




};
