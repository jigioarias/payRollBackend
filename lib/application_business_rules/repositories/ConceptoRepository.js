'use strict';

module.exports = class {
  
  constructor(repository) {
    this.repository = repository;
  }

  persist(conceptoEntity) {
    return this.repository.persist(conceptoEntity);
  }

  merge(conceptoEntity) {
    return this.repository.merge(conceptoEntity);
  }

  remove(conceptoId) {
    return this.repository.remove(conceptoId);
  }

  get(conceptoId) {
    return this.repository.get(conceptoId);
  }

  findByType(enterprise,conceptType) {
    return this.repository.findByType(enterprise,conceptType);
   
  }
  
  find(enterprise) {
    return this.repository.find(enterprise);
  }

};