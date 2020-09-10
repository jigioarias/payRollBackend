'use strict';
const NovedadNomina = require('../../enterprise_business_rules/entities/NovedadNomina');
const Nomina = require('../../enterprise_business_rules/entities/Nomina');
const PrestamoDTO = require('../../application_business_rules/use_cases/PrestamoDTO');


//const {NOVEDAD_PENDIENTE} =require('./constantesSistema')


module.exports = async (enterprise,employeeId,year,period,clase, { prestamoRepository},{ periodoPrestamoRepository}) => {

  try {

   
   const listaPrestamos =  await prestamoRepository.find(enterprise, employeeId, year, clase,'P');
   const listaPeriodosPrestamos =  await periodoPrestamoRepository.find(enterprise, employeeId,'P',period);
   const prestamosDTO = new PrestamoDTO(listaPrestamos,listaPeriodosPrestamos)

   return prestamosDTO;


  } catch (error) {
    console.log(error);
    return null;    
  }



};
