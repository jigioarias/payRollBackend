'use strict';
const {ENTERPRISE,
      CLASE_NOMINA,
    DESCRIPCION_CLASE_NOMINA,
    DIAS_VACACIONES,
    TIPO_NOMINA,
    ERROR_VALIDATE,
    CENTRO_COSTOS,
    HORAS_MES,
    HORAS_DIA,
    TIPO_PERIODO} =require('./constantesValidacion')


module.exports = class {
    
  
    

     static validateCreate(claseNomina) {
   

        try {
         
            if( claseNomina.enterprise ==null){
                return ENTERPRISE;
            }
            

            if(claseNomina.clase ==null){
                return CLASE_NOMINA;
            }
            
            if(claseNomina.description ==null) {
                return DESCRIPCION_CLASE_NOMINA;
            }
            
            if(claseNomina.vacationdays ==null && claseNomina.vacationdays <=0) {
                return DIAS_VACACIONES;
            }

            if(claseNomina.payrolltype== null) {

                return TIPO_NOMINA;
            }
            
            if(claseNomina.monthhours == null && claseNomina.monthhours > 0) {      
               
                    return HORAS_MES;
                
            }

            if(claseNomina.dayshours == null && claseNomina.dayshours > 0) {      
               
                return HORAS_DIA;
            
            }
            
            if(claseNomina.workweek ==null){
                return CENTRO_COSTOS;
            }
            if( claseNomina.periodType ==null){
                return TIPO_PERIODO;

            }

            
           return null; 
        } catch (error) {
            console.log(error);
            return ERROR_VALIDATE;
        }
     
  
    }
 




}