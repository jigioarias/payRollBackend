'use strict';

module.exports = class {
  
  constructor(repository) {
    this.repository = repository;
  }

  async persist(semanaLaboralEntity) {
    return this.repository.persist(semanaLaboralEntity);
  }

  async merge(semanaLaboralEntity) {
    return this.repository.merge(semanaLaboralEntity);
  }

  async remove(semanaLaboralId) {
    return this.repository.remove(semanaLaboralId);
  }

 async get(semanaLaboralId) {
    return this.repository.get(semanaLaboralId);
  }

  async getByDescription(description) {
    return this.repository.getByDescription(description);
  }

  async find() {
    return this.repository.find();
  }

};