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

  get(userId) {
    return this.repository.get(conceptoId);
  }

  
  find() {
    return this.repository.find();
  }

};