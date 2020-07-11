'use strict';



module.exports = async (vacationRequest,{solicitudVacacionRepository}) => {


  
  try {
     

    const solicitudVacacion = solicitudVacacionRepository.merge(vacationRequest);

  
    return solicitudVacacion;
  
  

 
} catch (error) {
   console.log('Error:',error);
   return null;
}
   
};
