'use strict';

module.exports = async(idClase,{ claseNominaRepository }) => {

  
  const clase =  await claseNominaRepository.get(idClase);
  //console.log('clase::::::::::::::::::::',clase);
  return clase;
};
