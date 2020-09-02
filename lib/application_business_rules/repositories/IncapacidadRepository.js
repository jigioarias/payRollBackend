'use strict';

module.exports = class {
  
  constructor(repository) {
    this.repository = repository;
  }

  persist(incapacidadEntity) {
    return this.repository.persist(incapacidadEntity);
  }

  
  async find(incapacidadEntity) {
    return this.repository.find(incapacidadEntity);
  }

  async list(incapacidadEntity) {
    return this.repository.list(incapacidadEntity);
  }

};