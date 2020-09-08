'use strict';
const GrupoConceptos = require('../../enterprise_business_rules/entities/GrupoConceptos');


module.exports = async (enterprise,clase,group,active, {grupoConceptosRepository },{conceptoRepository}) => {

  try {


   let grupoConceptosEntity = new GrupoConceptos(null,  enterprise, clase, group ,null, active, null);

    
   const lista =  await grupoConceptosRepository.findByGroup(grupoConceptosEntity);


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
