'use strict';
const {ENTERPRISE,
    CLASE_NOMINA,
    ERROR_VALIDATE,
    CONCEPTO} =require('./constantesValidacion')


module.exports = class {
    
     static validateCreate(conceptoNomina) {
   
        try {
         
            if( conceptoNomina.enterprise ==null){
                return ENTERPRISE;
            }
            

            if(conceptoNomina.clase ==null){
                return CLASE_NOMINA;
            }
            
           
            
            if(conceptoNomina.concept==null) {
                return CONCEPTO;
            }

           return null; 
        
        } catch (error) {
            console.log(error);
            return ERROR_VALIDATE;
        }
     
  
    }
 




}