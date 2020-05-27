'use strict';

module.exports = class {
  
  constructor(repository) {
    this.repository = repository;
  }

  persist(sucursalEntity) {
    return this.repository.persist(sucursalEntity);
  }

  merge(sucursalEntity) {
    return this.repository.merge(sucursalEntity);
  }

  remove(sucursalId) {
    return this.repository.remove(sucursalId);
  }

  get(userId) {
    return this.repository.get(sucursalId);
  }

  getByDescription(description) {
    return this.repository.getByDescription(description);
  }

  find() {
    return this.repository.find();
  }

};