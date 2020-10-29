'use strict';
const {ENTERPRISE,
    CLASE_NOMINA,
    PERIODO,
    YEAR,
    MES,
    FECHA_FIN_PERIODO,
    FECHA_INICIO_PERIODO,
    ERROR_VALIDATE} =require('./constantesValidacion')


module.exports = class {
    
  
    

     static validateCreate(periodoClase) {
   
         console.log('XXXXXXXXXX}.::::::',periodoClase);

        try {
         
            if( periodoClase.enterprise ==null){
                return ENTERPRISE;
            }
            

            if(periodoClase.clase ==null){
                return CLASE_NOMINA;
            }
            
            if(periodoClase.period ==null) {
                return PERIODO;
            }
            
            if(periodoClase.year==null) {
                return YEAR;
            }

            if(periodoClase.month== null) {

                return MES;
            }
           
            if(periodoClase.initDate ==null){
                return FECHA_INICIO_PERIODO;
            }
            if( periodoClase.endDate ==null){
                return FECHA_FIN_PERIODO;

            }

            if(periodoClase.periodType != null) {      
                const fechaInicial  =  new Date(periodoClase.initDate);
                const fechaFinal =  new Date(periodoClase.endDate);
                
                if(fechaFinal < fechaInicial){
                    return FECHA_FIN_PERIODO_MENOR;
                }
            }

            
           return null; 
        
        } catch (error) {
            console.log(error);
            return ERROR_VALIDATE;
        }
     
  
    }
 




}