'use strict';

module.exports = class {

  constructor(repository) {
    this.repository = repository;
  }

  persist(incapacidadEntity) {
    return this.repository.persist(incapacidadEntity);
  }

  merge(incapacidadEntity) {
    return this.repository.merge(incapacidadEntity);
  }

  async find(incapacidadEntity) {
    return this.repository.find(incapacidadEntity);
  }

  async list(incapacidadEntity) {
    return this.repository.list(incapacidadEntity);
  }

  async listByClassPayRoll(incapacidadEntity) {
    return this.repository.listByClassPayRoll(incapacidadEntity);
  }
  async listByEnterprise(incapacidadEntity) {
    return this.repository.listByEnterprise(incapacidadEntity);
  }


  async findByDocument(incapacidadEntity) {
    return this.repository.findByDocument(incapacidadEntity);

  }

};