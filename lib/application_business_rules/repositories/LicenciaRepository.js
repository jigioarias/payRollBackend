'use strict';

module.exports = class {
  
  constructor(repository) {
    this.repository = repository;
  }

  persist(licenciaEntity) {
    return this.repository.persist(licenciaEntity);
  }

  
  async find(licenciaEntity) {
    return this.repository.find(licenciaEntity);
  }

  async list(licenciaEntity) {
    return this.repository.list(licenciaEntity);
  }

};