'use strict';

const Nomina = require('../../enterprise_business_rules/entities/Nomina');
const DetalleNomina = require('../../frameworks_drivers/database/models/DetalleNomina');
const nomina = require('../../frameworks_drivers/webserver/nomina');
const NominaDTO = require('../../application_business_rules/use_cases/NominaDTO');


module.exports = async( listaNomina,listaDetalleNomina, { nominaRepository }, {detalleNominaRepository}) => {
  
try {
    


 let listPayRolls = [];
 let listDetalleNomina =[];
 let registroDetalleNomina = null;

for(let nomina of listaNomina){


    
    let registroNomina = await nominaRepository.persist(nomina);
    for(let detalleNomina of listaDetalleNomina){

        if(detalleNomina.employeeId == nomina.employeeId){

           detalleNomina.payrollId = registroNomina.id;
           
            registroDetalleNomina = await detalleNominaRepository.persist(detalleNomina);
            listDetalleNomina.push(registroDetalleNomina);
    
        }

    }
  listPayRolls.push(new NominaDTO(registroNomina,listDetalleNomina));
  listDetalleNomina = [];
}


return listPayRolls;

} catch (error) {
    console.log(error);
    return null;   
}
  
};
