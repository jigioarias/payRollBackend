'use strict';



module.exports = async (enterprise,active,classPayRoll,{ empleadoRepository },{personaRepository}) => {

  try {
   
       let listaEmpleados= await empleadoRepository.find(enterprise,active,classPayRoll);
       return listaEmpleados;
      
    
  } catch (error) {
      console.log('Error:',error);    
  }
  


  
};
