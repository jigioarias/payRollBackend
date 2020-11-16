'use strict';

module.exports = (claseEntity,{ claseNominaRepository }) => {


  
  if (claseEntity ==null){
    return claseNominaRepository.find();

  }else{  
    
    return claseNominaRepository.getByState(claseEntity);
  } 
};
