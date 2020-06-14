'use strict';

module.exports = class {
  
  constructor(repository) {
    this.repository = repository;
  }

async  persist(nominaEntity) {
    return this.repository.persist(nominaEntity);
  }

 async merge(nominaEntity) {
    return this.repository.merge(nominaEntity);
  }

 async remove(nominaEntity) {
    return this.repository.remove(nominaEntity);
  }

async  get(nominaEntity) {
    return this.repository.get(nominaEntity);
  }
  
async  find(nominaEntity) {
    return this.repository.find(nominaEntity);
  }
  
  

};