'use strict';

module.exports = class {
    
  

     static validate(idEmployee, clase,period,concept,hour,valor,noveltyDate) {
   
        try {
         
            if(idEmployee ==null){
                return "id Empleado esta null";
            }
            

            if(clase ==null){
                return "Clase esta null";
            }
            
            if(period ==null){
                return "periodo esta null";
            }
            
            if(hour <=0){
                return "Las horas son menores o iguales a cero";
            }
        
            if(valor <=0){
                return "El valor es igual o menor a cero";
            }
            if(concept ==null){
                return "El concepto esta vacio";

            }

            if(noveltyDate ==null){
                return "La fecha de novedad es null";

            }

           return null; 
        } catch (error) {
            return "Error validate";
        }
     
  
    }
 




}