'use strict';



module.exports = async (enterprise,active,classPayRoll,{ empleadoRepository }) => {

  try {
   
       let listaEmpleados= await empleadoRepository.findByClassPayRoll(enterprise,active,classPayRoll);
       return listaEmpleados;
      
    
  } catch (error) {
      console.log('Error:',error);    
  }
  


  
};
