'use strict';

module.exports = class {
  
  constructor(repository) {
    this.repository = repository;
  }

async  persist(detalleNominaEntity) {
    return this.repository.persist(detalleNominaEntity);
  }

 async merge(detalleNominaEntity) {
    return this.repository.merge(detalleNominaEntity);
  }

 async remove(detalleNominaEntity) {
    return this.repository.remove(detalleNominaEntity);
  }

async  get(detalleNominaEntity) {
    return this.repository.get(detalleNominaEntity);
  }
  
async  find(detalleNominaEntity) {
    return this.repository.find(detalleNominaEntity);
  }
  
  

};