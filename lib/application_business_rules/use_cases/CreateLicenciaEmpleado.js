'use strict';

const ValidateNovedadesEmpleado = require('../../application_business_rules/use_cases/ValidateNovedadesEmpleado');


const Licencia = require('../../enterprise_business_rules/entities/Licencia');
const Empleado = require('../../enterprise_business_rules/entities/Empleado');
const LicenciaDTO = require('../../application_business_rules/use_cases/LicenciaDTO');


const { register } = require('hapi-swagger');


module.exports = async (enterprise, document, initDate, endDate,type, remuneration,user,
  employeeId,year, registerPeriod,clase,salary,state,hours,{ licenciaRepository},{vacacionRepository},{incapacidadRepository}) => {

    let licenciaDTO = null;

    try {

    let guardarLicencia = null;
    const empleado = new Empleado(employeeId, enterprise, null, null,
      null,null,null, 
     null, clase, null,null,
     null,null,null,null,null);
    
    
    let ano =initDate.substring(0,4);
    const fechaInicialSolicitud  =  new Date(initDate);
    const fechaFinalSolicitud =  new Date(endDate);
    const active = true;   
    const existeNovedad = await ValidateNovedadesEmpleado(enterprise,empleado,document,active,ano,fechaInicialSolicitud,fechaFinalSolicitud,{vacacionRepository},{licenciaRepository},{incapacidadRepository});
   
    if(!existeNovedad){
  
   
   const licencia =    new Licencia(
    null, enterprise, document, initDate, 
    endDate,type, 
    remuneration,user,
    employeeId,year,
     registerPeriod,clase,
    salary,state,
    hours); 
   
    guardarLicencia=  await licenciaRepository.persist(licencia);
    licenciaDTO = new LicenciaDTO(null, guardarLicencia); 

   }else{
    licenciaDTO = new LicenciaDTO(null, null); 
    licenciaDTO.setError('La licencia se cruza con otros novedades(Licencia, Vacaciones o Incapacidades)');
   }


  } catch (error) {

    licenciaDTO = new LicenciaDTO(null, null); 
    licenciaDTO.setError('Error tecnico:'+error);
  }
  return  licenciaDTO;

};
