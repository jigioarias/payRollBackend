'use strict';
const Nomina = require('../../enterprise_business_rules/entities/Nomina');
const DetalleNomina = require('../../enterprise_business_rules/entities/DetalleNomina');


module.exports =async ( enterprise,clase,period,type, { nominaRepository },{detalleNominaRepository}) => {

    try {
        

   if(type=='P'){    
    
    console.log('parametrossssssssss a borrrAR',enterprise,clase,period,type);     
    
    const nomina = new Nomina(null, enterprise,clase, null, null, null,null,null,null,period,null,null,null,null,null,type,null);

    let listaNomina = await nominaRepository.find(nomina);
    console.log(listaNomina.length);
    let borrarDetalle = false;
    let detalleNomina = null;
    for(let objNomina of listaNomina){
        
       detalleNomina = new  DetalleNomina(null,enterprise,objNomina.id,null,null,period,null,null,null,null,type,null); 
        borrarDetalle = detalleNominaRepository.remove(detalleNomina)

    }

    return  await nominaRepository.remove(nomina);

    }
    return false;

    } catch (error) {
        console.log(error);
        return false;

    }

  
};
