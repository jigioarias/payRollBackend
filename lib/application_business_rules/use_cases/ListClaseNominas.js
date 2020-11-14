'use strict';

module.exports = (claseEntity,{ claseNominaRepository }) => {


  console.log('claseEntity>>>>',claseEntity)
  if (claseEntity ==null){
    return claseNominaRepository.find();

  }else{
    
    return claseNominaRepository.getByState(claseEntity);
  } 
};
