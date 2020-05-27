'use strict';

module.exports = class {
  
  constructor(repository) {
    this.repository = repository;
  }

  persist(centroCostosEntity) {
    return this.repository.persist(centroCostosEntity);
  }

  merge(centroCostosEntity) {
    return this.repository.merge(centroCostosEntity);
  }

  remove(centroCostosId) {
    return this.repository.remove(centroCostosId);
  }

  get(userId) {
    return this.repository.get(centroCostosId);
  }

  
  getByDescription(description) {
    return this.repository.getByDescription(description);
  }

  find() {
    return this.repository.find();
  }

};