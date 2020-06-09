'use strict';

module.exports = (enterprise,active, { conceptoNominaRepository }) => {

  try {
     
    let conceptosClase= conceptoNominaRepository.find(enterprise,active);
    
    

  } catch (error) {
    
  }


};
