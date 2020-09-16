'use strict';
const Nomina = require('../../enterprise_business_rules/entities/Nomina');
const DetalleNomina = require('../../enterprise_business_rules/entities/DetalleNomina');


module.exports =async ( enterprise,clase,period,typeCommon,typeNew, { nominaRepository },{detalleNominaRepository}) => {

    try {

    const nomina = new Nomina(null, enterprise,clase, null, null, null,null,null,null,period,null,null,null,null,null,typeCommon,null);

    let listaNomina = await nominaRepository.find(nomina);
    let detalleNomina = null;
    let actualizarDetalle = null;
    let updateNomina = false;
   

    for(let objNomina of listaNomina){
        detalleNomina = new  DetalleNomina(null,enterprise,objNomina.id,null,null,period,null,null,null,null,typeNew,null); 
         actualizarDetalle = await detalleNominaRepository.merge(detalleNomina);
 

     }
     if(actualizarDetalle){
        nomina.type = typeNew;
        updateNomina = await nominaRepository.merge(nomina);
     }
    return updateNomina;

    } catch (error) {
        console.log(error);
        return false;

    }

  
};
