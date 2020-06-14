'use strict';
const EmpleadoDTO = require('../../application_business_rules/use_cases/EmpleadoDTO');



module.exports = async (enterprise,active,classPayRoll,{ empleadoRepository },{personaRepository}) => {

  try {
   

       
       
       let lista = [];
       let persona = null;   
       let listaEmpleados= await empleadoRepository.findByClassPayRoll(enterprise,active,classPayRoll);

       for (let index = 0; index < listaEmpleados.length; index++) {
         const element = listaEmpleados[index];
        
         let persona = await personaRepository.get(element.idPerson);
         lista.push(new EmpleadoDTO(persona,element));
       
       }
  
   
       return lista;
       
       

    
  } catch (error) {
      console.log('Error:',error);
      return null;
  }
  


  
};
