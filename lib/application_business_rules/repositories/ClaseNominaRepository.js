'use strict';

module.exports = class {
  
  constructor(repository) {
    this.repository = repository;
  }

  async persist(claseNominaEntity) {
    return this.repository.persist(claseNominaEntity);
  }

  async merge(claseNominaEntity) {
    return this.repository.merge(claseNominaEntity);
  }

  async remove(claseNominaId) {
    return this.repository.remove(claseNominaId);
  }

 async get(claseNominaId) {
    return this.repository.get(claseNominaId);
  }

  async getByDescription(description) {
    return this.repository.getByDescription(description);
  }

  async find() {
    return this.repository.find();
  }

};