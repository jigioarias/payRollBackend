'use strict';

const empleado = require('../../enterprise_business_rules/entities/Empleado');
const EmpleadoDTO = require('../../application_business_rules/use_cases/EmpleadoDTO');





module.exports = async (enterprise,active,{ empleadoRepository },{personaRepository}) => {

  try {
    console.log('holaaaaa');
    //(async function(){
        let lista = [];
        let persona = null;   
        let listaEmpleados= await empleadoRepository.find(enterprise,active);

        for (let index = 0; index < listaEmpleados.length; index++) {
          const element = listaEmpleados[index];
         
          let persona = await personaRepository.get(element.idPerson);
          lista.push(new EmpleadoDTO(persona,element));
        
        }
   
    
        return lista;
      
    
  } catch (error) {
      console.log('Error:',error);    
  }
  
  //})()   

  
};
