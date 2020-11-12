'use strict';

module.exports = class {
  
  constructor(repository) {
    this.repository = repository;
  }

  persist(conceptoEntity) {
    return this.repository.persist(conceptoEntity);
  }

 async merge(conceptoEntity) {
    return await this.repository.merge(conceptoEntity);
  }

async  remove(conceptoId) {
    return await this.repository.remove(conceptoId);
  }

  async  get(conceptoId) {
     try {
   
    const concepto =  await this.repository.get(conceptoId);
     return concepto;

  } catch (error) {
    console.log(error);
    return null;
  }
   
  
  }

  findByType(enterprise,conceptType) {
    return this.repository.findByType(enterprise,conceptType);
   
  }
  
  findByCode(enterprise,code) {
    return this.repository.findByCode(enterprise,code);
   
  }
  
  find(enterprise) {
    return this.repository.find(enterprise);
  }


  async getConceptsByCodigos(enterprise,listaConceptos){
    return this.repository.getConceptsByCodigos(enterprise,listaConceptos);

  }

};