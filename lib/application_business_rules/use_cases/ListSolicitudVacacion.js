'use strict';



module.exports = async (vacationRequest,{solicitudVacacionRepository}) => {


  
  try {
     

    const lista = solicitudVacacionRepository.list(vacationRequest);

  
    return lista;
  
  

 
} catch (error) {
   console.log('Error:',error);
   return null;
}
   
};
