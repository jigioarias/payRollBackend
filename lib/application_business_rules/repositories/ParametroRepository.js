'use strict';

module.exports = class {
  
  constructor(repository) {
    this.repository = repository;
  }

  persist(parametroEntity) {
    return this.repository.persist(parametroEntity);
  }

 async merge(parametroEntity) {
    return await this.repository.merge(parametroEntity);
  }

async  remove(parametroId) {
    return await this.repository.remove(parametroId);
  }

  async  get(parametroId) {
     try {
   
    console.log('concepto id::::',parametroId);
    const concepto =  await this.repository.get(parametroId);
     return concepto;

  } catch (error) {
    console.log(error);
    return null;
  }
 
    
  }


  async  findByDescription(enterprise,description) {
    try {
    console.log(description);
    const parametro =  await this.repository.findByDescription(enterprise,description);
    return parametro;

    } catch (error) {
        console.log(error);
        return null;
     }

  }
 
  
  
 async find(enterprise,active) {   try {
  

    const parametros =  await   this.repository.find(enterprise,active);
    return parametros;
 
  } catch (error) {
    console.log(error);
    return null;
  }
 


  }

};