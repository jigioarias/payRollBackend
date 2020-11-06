'use strict';

module.exports = class {
  
  constructor(repository) {
    this.repository = repository;
  }

  persist(licenciaEntity) {
    return this.repository.persist(licenciaEntity);
  }

  merge(licenciaEntity) {
    return this.repository.merge(licenciaEntity);
  }
  
  async find(licenciaEntity) {
    return this.repository.find(licenciaEntity);
  }

  async list(licenciaEntity) {
    return this.repository.list(licenciaEntity);
  }

  async listByClassPayRoll(licenciaEntity) {
    return this.repository.listByClassPayRoll(licenciaEntity);
  }
  async listByEnterprise(licenciaEntity) {
    return this.repository.listByEnterprise(licenciaEntity);
  }
  

  async findByDocument(licenciaEntity){
    return this.repository.findByDocument(licenciaEntity);

  }
};