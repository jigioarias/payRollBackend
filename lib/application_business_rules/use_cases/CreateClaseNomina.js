'use strict';

const ClaseNomina = require('../../enterprise_business_rules/entities/ClaseNomina');
const ClaseNominaRules = require('../../application_business_rules/use_cases/ClaseNominaRules');
const ClaseNominaDTO = require('../../application_business_rules/use_cases/ClaseNominaDTO');
const {ERROR_TECNICO} =require('./constantesValidacion');


module.exports = async( enterprise, clase, description, 
                        vacationDays,vacationPrima,
                        primatype,provisionservicedays,
                        provisionservicetype,
                        payrolltype,monthhours,dayshours,bank,bankbranch,account,user,
                        workweek,periodType,active,{ claseNominaRepository }) => {
  
      let claseNominac = null;
        let mensajeValidacionClaseNomina = null;
        let claseNominaDTO = null;
         try {
        
const claseNomina = new ClaseNomina(null, enterprise, clase, description, vacationDays,vacationPrima,primatype,provisionservicedays,provisionservicetype,payrolltype,
    monthhours,dayshours,bank,bankbranch,account,user,workweek,periodType,active);
    
    mensajeValidacionClaseNomina = ClaseNominaRules.validateCreate(claseNomina);
    //console.log(mensajeValidacionClaseNomina); 
    if (mensajeValidacionClaseNomina == null){
        claseNominac = await claseNominaRepository.persist(claseNomina);
        claseNominaDTO = new ClaseNominaDTO(claseNominac);

    } else{
        claseNominaDTO = new ClaseNominaDTO(claseNominac);
        claseNominaDTO.setError(mensajeValidacionClaseNomina);
    }  
    
} catch (error) {
    console.log(error);
    claseNominaDTO = new ClaseNominaDTO(null);
    claseNominaDTO.setError(ERROR_TECNICO+':'+error); 
}


return claseNominaDTO;
    
  
};
