'use strict';

module.exports = class {
  
  constructor(repository) {
    this.repository = repository;
  }

async  persist(novedadNominaEntity) {
    return this.repository.persist(novedadNominaEntity);
  }

 async merge(novedadNominaEntity) {
    return this.repository.merge(novedadNominaEntity);
  }

 async remove(novedadNominaEntity) {
    return this.repository.remove(novedadNominaEntity);
  }

  async removeByConcept(novedadNominaEntity) {
    return this.repository.removeByConcept(novedadNominaEntity);
  }
  
async  get(novedadNominaEntity) {
    return this.repository.get(novedadNominaEntity);
  }
  
async  find(novedadNominaEntity) {
    return this.repository.find(novedadNominaEntity);
  }
  
  async  findByEmployee(novedadNominaEntity) {
    return this.repository.findByEmployee(novedadNominaEntity);
  }

};