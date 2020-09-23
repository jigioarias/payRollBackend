'use strict';

const ValidateNovedadesEmpleado = require('../../application_business_rules/use_cases/ValidateNovedadesEmpleado');


const Incapacidad = require('../../enterprise_business_rules/entities/Incapacidad');
const Empleado = require('../../enterprise_business_rules/entities/Empleado');

const { register } = require('hapi-swagger');


module.exports = async (enterprise, document, initDate, endDate,type,user,
  employeeId,year, registerPeriod,clase,salary,active,percentage,{ incapacidadRepository},{vacacionRepository},{licenciaRepository}) => {

  try {

    let guardarIncapacidad = null;
    const empleado = new Empleado(employeeId, enterprise, null, null,
      null,null,null, 
     null, clase, null,null,
     null,null,null,null,null);
    
    let ano =initDate.substring(0,4);
    const fechaInicialSolicitud  =  new Date(initDate);
    const fechaFinalSolicitud =  new Date(endDate);
 
    const existeNovedad = await ValidateNovedadesEmpleado(enterprise,empleado,document,active,ano,fechaInicialSolicitud,fechaFinalSolicitud,{vacacionRepository},{licenciaRepository},{incapacidadRepository});
   
    if(!existeNovedad){
  
        const incapacidad =   
          new Incapacidad(
          null, enterprise, document, initDate, 
          endDate,type, 
          user,
          employeeId,year,
          registerPeriod,clase,
          salary,active,
          percentage); 
   
        guardarIncapacidad=  await incapacidadRepository.persist(incapacidad);

    }
    return  guardarIncapacidad;

  } catch (error) {
    console.log(error);
    return null;    
  }



};
