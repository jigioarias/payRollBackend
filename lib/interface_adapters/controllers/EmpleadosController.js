'use strict';

const Boom = require('@hapi/boom');
const ResponseSerializer = require('../serializers/ResponseSerializer');
const ListEmpleados = require('../../application_business_rules/use_cases/ListEmpleados');
const ListEmpleadoIdPersona = require('../../application_business_rules/use_cases/ListEmpleadoIdPersona');
const CreateEmpleado = require('../../application_business_rules/use_cases/CreateEmpleado');
const CreatePersona = require('../../application_business_rules/use_cases/CreatePersona');

const Persona = require('../../enterprise_business_rules/entities/Persona');

const Response = require('../../application_business_rules/use_cases/Response');
const EmpleadoDTO = require('../../application_business_rules/use_cases/EmpleadoDTO');

const EmpleadoRepository = require('../../application_business_rules/repositories/EmpleadoRepository');
const PersonaRepository = require('../../application_business_rules/repositories/PersonaRepository');

//const UserRepositoryInMemory = require('../storage/UserRepositoryInMemory');
const EmpleadoRepositoryMySQL = require('../storage/EmpleadoRepositoryMYSQL');
const PersonaRepositorySQL = require('../storage/PersonaRepositoryMYSQL');

const empleadoRepository = new EmpleadoRepository(new EmpleadoRepositoryMySQL());
const personaRepository = new PersonaRepository(new PersonaRepositorySQL());

/*
const UserRepositorySQLite = require('../storage/UserRepositorySQLite');
const userRepository = new UserRepository(new UserRepositorySQLite());
*/



module.exports = {
     async createEmpleado(request) {

     

    // Input
  
     
    // Treatmen
   
 
    
    var empleadoDTO = null;
    let response =null;
    const responseSerializer = new ResponseSerializer();

    try {


      const personag = await CreatePersona( 
        request.payload.person,
        {personaRepository});
        console.log('creando>>>');
        
        
       
        const idPersona = personag.id;  
        console.log('persona id>>>',idPersona);
       const  empleado = await CreateEmpleado( request.payload.employee,idPersona,
        { empleadoRepository }).then(resolve=>{
          
          console.log('empladodo>>>',resolve);

        empleadoDTO = new EmpleadoDTO(personag,resolve);
        response =new Response(empleadoDTO,'OK','');
       
            
        });
        
        return responseSerializer.serialize(response);
        
  
    } catch (err) {
 
       empleadoDTO = new EmpleadoDTO(null,null);
       response =new Response(empleadoDTO,'Error',err);
        return responseSerializer.serialize(response);    
    }

 
  

  },


  async findEmpleados() {
    // Treatment
   
   try {
    const empleados=  await ListEmpleados(1,true,{  empleadoRepository},{personaRepository });
   
    const responseSerializer = new ResponseSerializer();
      const  response =new Response(empleados,'OK','');
       return responseSerializer.serialize(response); 
    
   } catch (error) {
    const responseSerializer = new ResponseSerializer();
    const  response =new Response(null,'Error',error);
    return responseSerializer.serialize(response); 
 
   }
   


 
    // Output
   

  },

  

};
