'use strict';

module.exports = async (enterprise,clase,active, { conceptoNominaRepository },{conceptoRepository}) => {

  try {

   

    
   const lista =  await conceptoNominaRepository.findByClassPayRoll(enterprise,clase,active);


    let listaConceptos = [];
  


    for (let index = 0; index < lista.length; index++) {
      const element = lista[index];
      
      let concepto =  await conceptoRepository.get(element.concept);
      listaConceptos.push(concepto);
    
    }


    return listaConceptos;

  } catch (error) {
    console.log(error);
    return null;    
  }



};
