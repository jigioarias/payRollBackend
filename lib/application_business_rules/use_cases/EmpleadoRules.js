'use strict';
const {SUCURSAL,ENTERPRISE,CLASE,ID_PERSONA,SALARIO,
    TIPO_SALARIO,
    FECHA_INICIO_CONTRATO,
    FECHA_FIN_CONTRATO_MENOR,
    CENTRO_COSTOS,
    DEPARTAMENTO,
    UNIDAD,
    AREA} =require('./constantesValidacion')


module.exports = class {
    
  

     static validateCreate(employee) {
   
 
      

        try {
         
            if( employee.enterprise ==null){
                return ENTERPRISE;
            }
            

            if(employee.idPerson ==null){
                return ID_PERSONA;
            }
            
            if(employee.salary ==null || employee.salary <=0) {
                return SALARIO
            }
            
            if(employee.salaryType ==null){
                return TIPO_SALARIO;
            }

            if(employee.initDateContract== null) {

                return FECHA_INICIO_CONTRATO;
            }
            if(employee.endDateContract != null) {      
                const fechaInicialContrato  =  new Date(employee.initDateContract);
                const fechaFinalContrato=  new Date(employee.endDateContract);
                
                if(fechaFinalContrato < fechaInicialContrato){
                    return FECHA_FIN_CONTRATO_MENOR
                }
            }
            
            if(employee.costCenter ==null){
                return CENTRO_COSTOS;
            }
            if( employee.classPayRoll ==null){
                return CLASE;

            }

            if(employee.departament ==null){

                return DEPARTAMENTO;

            
            }

            if(employee.branchOffice ==null){
                return SUCURSAL;

            }

            if(employee.unity ==null){
                return UNIDAD;

            }
            if(employee.area ==null){
                return AREA;

            }
            
           return null; 
        } catch (error) {
            return ERROR_VALIDATE;
        }
     
  
    }
 




}