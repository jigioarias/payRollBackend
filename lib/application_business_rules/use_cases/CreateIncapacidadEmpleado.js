'use strict';

const ValidateNovedadesEmpleado = require('../../application_business_rules/use_cases/ValidateNovedadesEmpleado');


const Incapacidad = require('../../enterprise_business_rules/entities/Incapacidad');
const Empleado = require('../../enterprise_business_rules/entities/Empleado');
const IncapacidadDTO = require('../../application_business_rules/use_cases/IncapacidadDTO');

const { register } = require('hapi-swagger');


module.exports = async (enterprise, document, initDate, endDate,type,user,
  employeeId,year, registerPeriod,clase,salary,state,percentage,{ incapacidadRepository},{vacacionRepository},{licenciaRepository}) => {


    let incapacidadDTO = null;

  try {

    let guardarIncapacidad = null;
    const empleado = new Empleado(employeeId, enterprise, null, null,
      null,null,null, 
     null, clase, null,null,
     null,null,null,null,null);
    
    let ano =initDate.substring(0,4);
    const fechaInicialSolicitud  =  new Date(initDate);
    const fechaFinalSolicitud =  new Date(endDate);
    const active = true; 
    const existeNovedad = await ValidateNovedadesEmpleado(enterprise,empleado,document,active,ano,fechaInicialSolicitud,fechaFinalSolicitud,{vacacionRepository},{licenciaRepository},{incapacidadRepository});
    console.log('mensaje validacion>>>>',existeNovedad);
    if(!existeNovedad){
  
        const incapacidad =   
          new Incapacidad(
          null, enterprise, document, initDate, 
          endDate,type, 
          user,
          employeeId,year,
          registerPeriod,clase,
          salary,state,
          percentage); 
   
        guardarIncapacidad=  await incapacidadRepository.persist(incapacidad);
        incapacidadDTO = new IncapacidadDTO(null, guardarIncapacidad); 


    }else{
      incapacidadDTO = new IncapacidadDTO(null, null); 
      incapacidadDTO.setError('La incapacidad se cruza con otros novedades(Licencia, Vacaciones o Incapacidades)');


    }
  

  } catch (error) {
    console.log(error);
    licenciaDTO = new LicenciaDTO(null, null); 
    licenciaDTO.setError('Error tecnico:'+error);
  }

  return  incapacidadDTO;

};
