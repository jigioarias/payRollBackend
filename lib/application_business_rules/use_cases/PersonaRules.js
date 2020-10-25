'use strict';
const { ESTADO_PRESTAMO_PENDIENTE } = require('../../interface_adapters/controllers/constantesSistema');
const {
    NOMBRE,
    APELLIDOS,
    TELEFONO,
    DEPARTAMENTO_PERSONA,
    CORREO,
    DOCUMENTO,
    TIPO_DOCUMENTO,
    ESTADO_CIVIL,
    DIRECCION,
    PAIS,
    ERROR_VALIDATE,
    MUNICIPIO} =require('./constantesValidacion')


module.exports = class {
    
  

     static validateCreate(person) {
   
 
        try {
         
            if( person.firstName ==null || person.firstName.trim()==''){
                return NOMBRE;
            }
            

            if(person.lastName ==null || person.lastName.trim()==''){
                return APELLIDOS;
            }
            
            if(person.phone ==null  || person.phone.trim()=='') {
                return TELEFONO;
            }
            
            if(person.email ==null  || person.email.trim()==''){
                return CORREO;
            }

            if(person.document== null  || person.document.trim()=='') {

                return DOCUMENTO;
            }
          
            if(person.typeDocument ==null  || person.typeDocument.trim()==''){
                return TIPO_DOCUMENTO;
            }
            if( person.address ==null   || person.address.trim()==''){
                return DIRECCION;

            }

                   
            if(person.department ==null || person.department.trim()==''){

                return DEPARTAMENTO_PERSONA;

            
            }

            if(person.country ==null  || person.country.trim()==''){
                return PAIS;

            }

            if(person.municipality ==null  || person.municipality.trim()==''){
                return MUNICIPIO;

            }
           
            if(person.civilState <=0){
                return ESTADO_CIVIL;

            }
            
           return null; 
        } catch (error) {
            console.log('error validando persona',error);
            return ERROR_VALIDATE;
        }
     
  
    }
 




}