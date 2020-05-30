'use strict';

module.exports = class {
  
  constructor(repository) {
    this.repository = repository;
  }

  persist(claseNominaEntity) {
    return this.repository.persist(claseNominaEntity);
  }

  merge(claseNominaEntity) {
    return this.repository.merge(claseNominaEntity);
  }

  remove(claseNominaId) {
    return this.repository.remove(claseNominaId);
  }

  get(userId) {
    return this.repository.get(claseNominaId);
  }

  getByDescription(description) {
    return this.repository.getByDescription(description);
  }

  find() {
    return this.repository.find();
  }

};