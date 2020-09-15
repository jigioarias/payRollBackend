    'use strict';

const Boom = require('@hapi/boom');
const ResponseSerializer = require('../serializers/ResponseSerializer');

const Nomina = require('../../enterprise_business_rules/entities/Nomina');
const DetalleNomina = require('../../enterprise_business_rules/entities/DetalleNomina');

const ListGroupConceptos = require('../../application_business_rules/use_cases/ListGroupConceptos');
const GetPrestamosNominaEmpleado = require('../../application_business_rules/use_cases/GetPrestamosNominaEmpleado');
const ListEmpleadosClaseNomina = require('../../application_business_rules/use_cases/ListEmpleadosClaseNomina');
const ListNovedadesNominaEmpleado = require('../../application_business_rules/use_cases/ListNovedadesNominaEmpleado');
const ListConceptoClaseNomina = require('../../application_business_rules/use_cases/ListConceptoClaseNomina');
const ListParametroDescripcion = require('../../application_business_rules/use_cases/ListParametroDescripcion');
const CreateNomina = require('../../application_business_rules/use_cases/CreateNomina');
const RemoveNomina = require('../../application_business_rules/use_cases/RemoveNomina');
const RemovePrestacionSocial = require('../../application_business_rules/use_cases/RemovePrestacionSocial');
const CreatePrestacionSOcial = require('../../application_business_rules/use_cases/CreatePrestacionSocial');
const GetVacacionesNominaEmpleado = require('../../application_business_rules/use_cases/GetVacacionesNominaEmpleado');
const RemoveNovedadNominaEmpleado = require('../../application_business_rules/use_cases/RemoveNovedadNominaEmpleado');
const  GetLicenciaNominaEmpleado = require('../../application_business_rules/use_cases/GetLicenciaNominaEmpleado');
const  GetIncapacidadNominaEmpleado = require('../../application_business_rules/use_cases/GetIncapacidadNominaEmpleado');
const CreateNovedadNominaEmpleado = require('../../application_business_rules/use_cases/CreateNovedadNominaEmpleado');
const UpdatePrestamo =require('../../application_business_rules/use_cases/UpdatePrestamo');

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
const vacacionRepository = new VacacionRepository(new VacacionRepositorySQL());

const LicenciaRepository = require('../../application_business_rules/repositories/LicenciaRepository');//interface
const  LicenciaRepositorySQL = require('../storage/LicenciaRepositoryMYSQL'); //implementacion
const licenciaRepository = new LicenciaRepository(new LicenciaRepositorySQL());

const IncapacidadRepository = require('../../application_business_rules/repositories/IncapacidadRepository');//interface
const  IncapacidadRepositorySQL = require('../storage/IncapacidadRepositoryMYSQL'); //implementacion
const incapacidadRepository = new IncapacidadRepository(new IncapacidadRepositorySQL());

const   GrupoConceptosRepository = require('../../application_business_rules/repositories/GrupoConceptosRepository');//interface
const  GrupoConceptosRepositorySQL = require('../storage/GrupoConceptosRepositoryMYSQL'); //implementacion
const grupoConceptosRepository = new GrupoConceptosRepository(new GrupoConceptosRepositorySQL());


const PrestamoRepository = require('../../application_business_rules/repositories/PrestamoRepository');//interface
const  PrestamoRepositorySQL = require('../storage/PrestamoRepositoryMYSQL'); //implementacion
const prestamoRepository = new PrestamoRepository(new PrestamoRepositorySQL());



const PeriodoPrestamoRepository = require('../../application_business_rules/repositories/PeriodoPrestamoRepository');//interface
const  PeriodoPrestamoRepositorySQL = require('../storage/PeriodoPrestamoRepositoryMYSQL'); //implementacion
const periodoPrestamoRepository = new PeriodoPrestamoRepository(new PeriodoPrestamoRepositorySQL());

const {GRUPO_IBC,CONCEPTO_LICENCIA_NOREMUNERADA,CONCEPTO_INCAPACIDAD,CONCEPTO_LICENCIA_REMUNERADA,DESCRIPCION_CONCEPTO_AUXILIO_TRANSPORTE,VALOR_AUXILIO_TRANSPORTE,VALOR_SALARIO_TRANSPORTE,CONCEPTO_AUXILIO_TRANSPORTE,CONCEPTO_VACACION_SALARIO} =require('./constantesParametros')
const {ESTADO_PRESTAMO_PAGADO,ESTADO_PRESTAMO_PENDIENTE,DIAS_COMERCIAL,DIAS_JULIANO,CODIGO_DIAS_JULIANO,CODIGO_PENDIENTE,TIPO_AJUSTE_SUMA, TIPO_AJUSTE_RESTA,NOVEDAD_PENDIENTE} =require('./constantesSistema')



module.exports = {
  async createNomina(request) {
    let response = null;
    const responseSerializer = new ResponseSerializer();
    try {

      if(request.payload.classPayRoll ==null 
        || request.payload.period ==null
        || request.payload.active == null
        || request.payload.clase == null){

          response = new Response(request.payload, 'Error', 'Datos error , Falta datos de entrada al servicio');
          return responseSerializer.serialize(response);
      }

      const claseId =request.payload.classPayRoll.id;
      const empresaId = request.payload.enterprise;
      const activeClassPayRoll = request.payload.active;
      const diasNomina = (request.payload.payrolltype==CODIGO_DIAS_JULIANO)?DIAS_JULIANO:DIAS_COMERCIAL;
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
      let ibcEmpleado = 0;
      

      let codigoGrupoIBC = await ListParametroDescripcion(empresaId,GRUPO_IBC,{parametroRepository});


      const listGroupConceptos = await ListGroupConceptos(request.payload.enterprise, 
                                                        request.payload.classPayRoll.id,
                                                        codigoGrupoIBC.value,
                                                        request.payload.active,{grupoConceptosRepository}, {conceptoRepository});

                                                    
    //console.log('listGroupConceptos ',listGroupConceptos);   


      let empleados = await ListEmpleadosClaseNomina(empresaId,activeClassPayRoll,claseId, { empleadoRepository },{personaRepository});
     
      let conceptosNominaBasicos = await ListConceptoClaseNomina(empresaId,claseId,activeClassPayRoll, { conceptoNominaRepository },{conceptoRepository});
     
      let valorAuxilio = await ListParametroDescripcion(empresaId,VALOR_AUXILIO_TRANSPORTE,{parametroRepository});
     
      let valorSalarioTransporte = await ListParametroDescripcion(empresaId,VALOR_SALARIO_TRANSPORTE,{parametroRepository});
      
      let conceptoAuxilioTransporte = await ListParametroDescripcion(empresaId,CONCEPTO_AUXILIO_TRANSPORTE,{parametroRepository});
      
      let conceptoLicenciaRemunerada= await ListParametroDescripcion(empresaId,CONCEPTO_LICENCIA_REMUNERADA,{parametroRepository});
      let conceptoLicenciaNoRemunerada= await ListParametroDescripcion(empresaId,CONCEPTO_LICENCIA_NOREMUNERADA,{parametroRepository});

      let conceptoIncapacidad= await ListParametroDescripcion(empresaId,CONCEPTO_INCAPACIDAD,{parametroRepository});


      //borro nominas temporales o pendiente
      let borrarNomina = await RemoveNomina( empresaId,claseId,periodValue,CODIGO_PENDIENTE, { nominaRepository },{detalleNominaRepository});
      
      //borro prestaciones sociales temporales o pendientes
      let borrarPrestacionSocial= await RemovePrestacionSocial( empresaId,claseId,periodValue,CODIGO_PENDIENTE, { prestacionSocialRepository });


      let conceptoDiasVacaciones = await ListParametroDescripcion(request.payload.enterprise,CONCEPTO_VACACION_SALARIO,{parametroRepository});
      
      //TODO BORRAR NOVEDADES DE NOMINA  (LICENCIAS Y OTROS QUE ESTEN ESTADO PENDIENTE)
      let removeNovedadesVacaciones = await RemoveNovedadNominaEmpleado(  empresaId,claseId,periodValue,NOVEDAD_PENDIENTE,{novedadNominaRepository});


      let getDiasVacacionesNominaEmpleado = null;
      let getDiasLicencias = null;
      let getDiasIncapacidad = null;
      let guardarNovedadVacacion = null;
      let guardarNovedadLicencia = null;
      let guardarNovedadIncapacidad = null;
      let guardarNovedadPrestamo  = null;
      let valorSalarioVacaciones = 0;
      let valorSalarioLicenciaNoRemunerada = 0;
      let valorSalarioLicenciaRemunerada = 0;
      let valorSalarioIncapacidad = 0;

      let dias = 0;
 
      const fechaInicioPeriodo = new Date(request.payload.period.initDate);
      const fechaFinPeriodo = new Date(request.payload.period.endDate);
      let fechaInicioContrato = null;
      let valorPrestamoEmpleado = 0;
      let fechaFinContrato = null;
      let salario =0;
      let salarioPeriodo = 0;
      let salarioTotal = 0;
      let auxilioTransporte = 0;
      let nominaRegistro = null;
      let salarioNovedadesEmpleado = 0;
      let salarioConceptosEmpleado = 0;
      let salariodia = 0;
      let horasLicenciaRemunerada = 0;
      let horasLicenciasNoRemumeradas =0;
      let listaPrestamos = null;

      if(empleados != null){
          for ( let empleado of empleados) {

            //inicializo variables 
            valorSalarioVacaciones = 0;
            horasLicenciaRemunerada = 0;
            horasLicenciasNoRemumeradas =0;
            valorSalarioLicenciaRemunerada = 0;
            valorSalarioLicenciaNoRemunerada = 0;
            valorPrestamoEmpleado = 0;
            ibcEmpleado = 0;
            salario = 0;
            salarioPeriodo = 0;
            //obtenemos las fechas de inicio y fin de contrato con su salario total
            fechaInicioContrato =  new Date(empleado.employee.initDateContract);
            fechaFinContrato = new Date(empleado.employee.endDateContract);
            salarioTotal =  empleado.employee.salary;
            salariodia = salarioTotal /diasNomina;
            


            auxilioTransporte =0;
            //calculamos los dias 
            dias =PayRollRules.calcularDiasNomina(fechaInicioContrato,fechaFinContrato,fechaInicioPeriodo,fechaFinPeriodo);
            //obtener los dias de vacaciones
            getDiasVacacionesNominaEmpleado = await GetVacacionesNominaEmpleado(empresaId,empleado.employee.id,empleado.person.document,yearPeriod, periodValue,request.payload.classPayRoll.id,initDatePeriod,endDatePeriod,{vacacionRepository})
            //obtener las horas  de licencia remuneradas y no remumeradas
            getDiasLicencias =  await GetLicenciaNominaEmpleado(empresaId,empleado.employee.id,empleado.person.document,yearPeriod, periodValue,request.payload.classPayRoll.id,initDatePeriod,endDatePeriod,true,{licenciaRepository});
            
            //console.log('diasss licenciassss',getDiasLicencias);
            horasLicenciasNoRemumeradas= getDiasLicencias.horasNoRemuneradas/request.payload.classPayRoll.dayshours;
            
            horasLicenciaRemunerada=getDiasLicencias.horasRemuneradas/request.payload.classPayRoll.dayshours;

            //lista de prestamos 
           //obtener los dias de incapacidad
           getDiasIncapacidad =  await GetIncapacidadNominaEmpleado(empresaId,empleado.employee.id,empleado.person.document,yearPeriod, periodValue,request.payload.classPayRoll.id,initDatePeriod,endDatePeriod,true,{incapacidadRepository});



            // console.log(getDiasVacacionesNominaEmpleado);
            dias = dias - getDiasVacacionesNominaEmpleado - horasLicenciaRemunerada- horasLicenciasNoRemumeradas - getDiasIncapacidad;

            //obtengo el valor de salario que se debe pagar por vacaciones
            if(getDiasVacacionesNominaEmpleado >0){
              valorSalarioVacaciones = salariodia* getDiasVacacionesNominaEmpleado ;

            }
            //obtengo el valor de salario de licencia
            //console.log('horas remuneradas',horasLicenciaRemunerada);            
            if(horasLicenciaRemunerada >0){
              valorSalarioLicenciaRemunerada = salariodia* horasLicenciaRemunerada ;

            }

           // console.log('valor salario rem',valorSalarioLicenciaRemunerada);            

           // console.log(horasLicenciasNoRemumeradas);            
            if(horasLicenciasNoRemumeradas >0){
              valorSalarioLicenciaNoRemunerada = salariodia* horasLicenciasNoRemumeradas ;

            }
            //console.log('valor salrio  NOOO rem',valorSalarioLicenciaNoRemunerada);            

            
            //obtengo el valor de salario de incapacidad
            //console.log(getDiasIncapacidad);            

            if(getDiasIncapacidad >0){
                valorSalarioIncapacidad =PayRollRules.calcularValorIncapacidad(diasNomina,getDiasIncapacidad,salarioTotal,66) ;
  
              }
            
 
            
            //obteneoms el salario por los dias de trabajo del periodo
            salario = salariodia* (dias) ;
           // console.log('valor salario>>>>',salario);
           
            //asignacion de salario periodo
            salarioPeriodo = salario;
            
            salarioConceptosEmpleado= 0;
           
           if(conceptosNominaBasicos != null){

            let valorConcepto =0; 
            let detalleNominaRegistro = null;

            for(let iconcepto of conceptosNominaBasicos ){

                //calculo el valor del concepto
                valorConcepto = PayRollRules.calcularConceptoBasicosNomina(salario+valorSalarioVacaciones+valorSalarioLicenciaRemunerada ,iconcepto);
                          
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
                  CODIGO_PENDIENTE,
                  user,
                  );
                  
                  listaDetalleNomina.push(detalleNominaRegistro)
                

            }
          }
      

         // console.log('listaDetalleNomina:::',listaDetalleNomina);

           // salario = salario +salarioConceptosEmpleado;
           // console.log('salario con conceptos',salario);

           //valida que los dias de nomina del periodos sean mayores a cero 
           //si aplica subsidio de transporte
           // si el salario es inferior al maximo permitido por el gobierno

            if(dias>0 && 
              empleado.employee.transporteSubsidy && 
              salarioTotal <= parseInt(valorSalarioTransporte.value)){
              auxilioTransporte =   PayRollRules.calcularAuxilioTransporte(diasNomina,dias,valorAuxilio.value);
            } 

            if(auxilioTransporte > 0 ){
           
              let  conceptoAuxilio = new DetalleNomina(
                  null,
                  empresaId,
                  null,
                  empleado.employee.id,
                  conceptoAuxilioTransporte.value,
                  periodValue,
                  DESCRIPCION_CONCEPTO_AUXILIO_TRANSPORTE,
                  auxilioTransporte,
                  0,
                  TIPO_AJUSTE_SUMA,
                  CODIGO_PENDIENTE,
                  user);

                  listaDetalleNomina.push(conceptoAuxilio);

            }
           


            listaNovedadesEmpleado = await ListNovedadesNominaEmpleado(empresaId,claseId,periodValue,empleado.employee.id,{novedadNominaRepository})
            salarioNovedadesEmpleado = 0;
            listaNovedadesEmpleado.forEach(novedad => {
              
              salarioNovedadesEmpleado = salarioNovedadesEmpleado + novedad.valor;
            
            });
            
             
            //console.log('salario con conceptos',salarioConceptosEmpleado);  
            //console.log('salario novedades',salarioNovedadesEmpleado);  
            //console.log ('salario trabajo',salario);
            //console.log('auxilio',auxilioTransporte);
            salario = salario +salarioConceptosEmpleado +salarioNovedadesEmpleado+auxilioTransporte ;

            
             // guardarNovedadVacacion = null;

              /*if(getDiasVacacionesNominaEmpleado >0){

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
                  TIPO_AJUSTE_RESTA,
                  {novedadNominaRepository}
                  );

                  listaNovedadesEmpleado.push(guardarNovedadVacacion);
              }*/

  

               guardarNovedadLicencia = null;
              // console.log('entrooooooo');

              if(horasLicenciaRemunerada >0){
                //console.log('entrooooooo');
                guardarNovedadLicencia = await CreateNovedadNominaEmpleado(
                  empresaId,
                  request.payload.classPayRoll.id,
                  empleado.employee.id,
                  empleado.person.document,
                  conceptoLicenciaRemunerada.value,
                  periodValue,
                  valorSalarioLicenciaRemunerada,
                  horasLicenciaRemunerada, 
                  fechaInicioPeriodo,
                  fechaFinPeriodo,
                  user,
                  TIPO_AJUSTE_SUMA,
                  NOVEDAD_PENDIENTE,
                  {novedadNominaRepository}
                  );

                  listaNovedadesEmpleado.push(guardarNovedadLicencia);
              }


              if(horasLicenciasNoRemumeradas >0){

                guardarNovedadLicencia = null;


                guardarNovedadLicencia = await CreateNovedadNominaEmpleado(
                  empresaId,
                  request.payload.classPayRoll.id,
                  empleado.employee.id,
                  empleado.person.document,
                  conceptoLicenciaNoRemunerada.value,
                  periodValue,
                  valorSalarioLicenciaNoRemunerada,
                  horasLicenciasNoRemumeradas, 
                  fechaInicioPeriodo,
                  fechaFinPeriodo,
                  user,
                  TIPO_AJUSTE_RESTA,
                  NOVEDAD_PENDIENTE,
                  {novedadNominaRepository}
                  );

                  listaNovedadesEmpleado.push(guardarNovedadLicencia);
              }

              guardarNovedadIncapacidad = null;

              if(getDiasIncapacidad >0){

                guardarNovedadIncapacidad= await CreateNovedadNominaEmpleado(
                  empresaId,
                  request.payload.classPayRoll.id,
                  empleado.employee.id,
                  empleado.person.document,
                  conceptoIncapacidad.value,
                  periodValue,
                  valorSalarioIncapacidad,
                  getDiasIncapacidad* request.payload.classPayRoll.dayshours, 
                  fechaInicioPeriodo,
                  fechaFinPeriodo,
                  user,
                  TIPO_AJUSTE_SUMA,
                  NOVEDAD_PENDIENTE,
                  {novedadNominaRepository}
                  );

                  listaNovedadesEmpleado.push(guardarNovedadIncapacidad);
              }


              

              //console.log('lista de listGroupConceptos',listGroupConceptos);

              if(listGroupConceptos !=null && listGroupConceptos.length>0){
                
               
               for (let index1 = 0; index1 < listGroupConceptos.length; index1++) {
                 const econceptoIBC = listGroupConceptos[index1];
                 
                            for (let index = 0; index < listaNovedadesEmpleado.length; index++) {
                              const econceptoEmpleado = listaNovedadesEmpleado[index];
                              //console.log('concpeto ibc',parseInt(econceptoIBC.code));
                                // console.log('concepto empleado',econceptoEmpleado.concept);
                                  if(econceptoIBC.code ==econceptoEmpleado.concept){
                                    //console.log('concepto empleado',econceptoEmpleado);
                                    ibcEmpleado = ibcEmpleado + econceptoEmpleado.valor;
                                    
                                  }
                            }
                 
                }

                 //console.log('IBC del man',ibcEmpleado); 
                nominaRegistro = new Nomina(
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
                  ibcEmpleado
                  );
                  listaNomina.push(nominaRegistro);
    

              }

              listaPrestamos = await  GetPrestamosNominaEmpleado(empresaId,empleado.employee.id,yearPeriod,periodValue,request.payload.classPayRoll.id,{prestamoRepository},{periodoPrestamoRepository});
             
              for (let index = 0; index < listaPrestamos.prestamo.length; index++) {
                const objPrestamo = listaPrestamos.prestamo[index];
                const objPeriodoPrestamo = listaPrestamos.periodoPrestamo[index];
     

                guardarNovedadPrestamo = null;
               
                guardarNovedadPrestamo= await CreateNovedadNominaEmpleado(
                  empresaId,
                  request.payload.classPayRoll.id,
                  empleado.employee.id,
                  empleado.person.document,
                  objPrestamo.concept,
                  periodValue,
                  objPeriodoPrestamo.fee,
                  0, 
                  fechaInicioPeriodo,
                  fechaFinPeriodo,
                  user,
                  TIPO_AJUSTE_RESTA,
                  NOVEDAD_PENDIENTE,
                  {novedadNominaRepository}
                  );

                  listaNovedadesEmpleado.push(guardarNovedadPrestamo);
 

              }





          }
        if(listaNovedadesEmpleado!=null &&  listaNovedadesEmpleado.length>0)
            {
            
              listaNovedadesEmpleado.forEach(element => {
                
                listaNovedadesNomina.push(element);

              });
            }

           
        }
      

    let listPayRollDTO = await CreateNomina(listaNovedadesNomina,listaNomina,listaDetalleNomina,{nominaRepository},{detalleNominaRepository});
    const calcularPrestaciones = await CreatePrestacionSOcial(listPayRollDTO,tipoPeriodoNomina,'N',{prestacionSocialRepository});
     
     
    
    //si todo esta OK devuelve la lista de empleados procesados con su respectivas novedades y conceptos
    response = new Response(listPayRollDTO, 'OK', '');
      return responseSerializer.serialize(response);

    } catch (err) {
       response = new Response(request.payload, 'Error', err);
      return responseSerializer.serialize(response);

      
       
    }


  },

  async asentarNomina(request) {
    let response = null;
    const responseSerializer = new ResponseSerializer();
    try {

      if(request.payload.classPayRoll ==null 
        || request.payload.period ==null
        || request.payload.active == null
        || request.payload.clase == null){

          response = new Response(request.payload, 'Error', 'Datos error , Falta datos de entrada al servicio');
          return responseSerializer.serialize(response);
      }

      const claseId =request.payload.classPayRoll.id;
      const empresaId = request.payload.enterprise;
      const activeClassPayRoll = request.payload.active;
      const diasNomina = (request.payload.payrolltype==CODIGO_DIAS_JULIANO)?DIAS_JULIANO:DIAS_COMERCIAL;
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
      let ibcEmpleado = 0;
      let listaPrestamos = null;

      let objPrestamo = null;
      let actualizarPrestamo = null;
      let objPeriodoPrestamo = null;
  
    let empleados = await ListEmpleadosClaseNomina(empresaId,activeClassPayRoll,claseId, { empleadoRepository },{personaRepository});
    if(empleados != null){
      for ( let empleado of empleados) {
        listaPrestamos = await  GetPrestamosNominaEmpleado(empresaId,empleado.employee.id,yearPeriod,periodValue,request.payload.classPayRoll.id,{prestamoRepository},{periodoPrestamoRepository});
           for (let index = 0; index < listaPrestamos.prestamo.length; index++) {
                 objPrestamo = listaPrestamos.prestamo[index];
                 objPeriodoPrestamo = listaPrestamos.periodoPrestamo[index];
                 objPrestamo.balance = objPrestamo.balance - objPeriodoPrestamo.fee;
                
                 if(objPrestamo.balance <=0){
                  objPrestamo.state = ESTADO_PRESTAMO_PAGADO;
                }
                 actualizarPrestamo = await UpdatePrestamo(objPrestamo,{prestamoRepository});
               



        }
     

     } 
    }


    //si todo esta OK devuelve la lista de empleados procesados con su respectivas novedades y conceptos
    response = new Response(listaPrestamos, 'OK', '');
      return responseSerializer.serialize(response);

    } catch (err) {
       response = new Response(request.payload, 'Error', err);
      return responseSerializer.serialize(response);

      
       
    }


  },


};
