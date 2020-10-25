'use strict';

const { ID_EMPLEADO, CLASE, PERIODO, VALOR_REQUERIDO, CONCEPTO,FECHA_NOVEDAD,HOURS } =require('./constantesValidacion')


module.exports = class {
    
  

     static validate(idEmployee, clase,period,concept,hour,valor,noveltyDate) {
   
        try {
         
            if(idEmployee ==null){
                return ID_EMPLEADO;
            }
            

            if(clase ==null){
                return CLASE;
            }
            
            if(period ==null){
                return PERIODO;
            }
            
            if(hour <=0){
                return HOURS;
            }
        
            if(valor <=0){
                return VALOR_REQUERIDO;
            }
            if(concept ==null){
                return CONCEPTO;

            }

            if(noveltyDate ==null){
                return FECHA_NOVEDAD;

            }

           return null; 
        } catch (error) {
            return ERROR_VALIDATE;
        }
     
  
    }
 




}