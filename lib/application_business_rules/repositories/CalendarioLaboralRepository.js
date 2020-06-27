'use strict';

module.exports = class {
  
  constructor(repository) {
    this.repository = repository;
  }

  async persist(calendarioLaboralEntity) {
    return this.repository.persist(calendarioLaboralEntity);
  }

  async merge(calendarioLaboralEntity) {
    return this.repository.merge(calendarioLaboralEntity);
  }

  async remove(semanaLaboralId) {
    return this.repository.remove(semanaLaboralId);
  }

 async get(semanaLaboralId) {
     
    return this.repository.get(semanaLaboralId);
  }

  async getByDate(calendarioLaboralEntity,fecha) {
    return this.repository.getByDescription(calendarioLaboralEntity,fecha);
  }

  async find(calendarioLaboralEntity) {
    return this.repository.find(calendarioLaboralEntity);
  }

};