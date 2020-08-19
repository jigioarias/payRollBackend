'use strict';

module.exports = class {
  
  constructor(repository) {
    this.repository = repository;
  }

  persist(areaEntity) {
    return this.repository.persist(areaEntity);
  }


  
  merge(areaEntity) {
    return this.repository.merge(areaEntity);
  }

  remove(areaId) {
    return this.repository.remove(areaId);
  }

  get(userId) {
    return this.repository.get(areaId);
  }

  getByDescription(description) {
    return this.repository.getByDescription(description);
  }

  find() {
    return this.repository.find();
  }

};