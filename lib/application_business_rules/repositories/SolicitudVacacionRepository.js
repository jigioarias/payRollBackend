'use strict';

module.exports = class {
  
  constructor(repository) {
    this.repository = repository;
  }

  persist(solicitudVacacionEntity) {
    return this.repository.persist(solicitudVacacionEntity);
  }


  merge(solicitudVacacionEntity) {
    return this.repository.merge(solicitudVacacionEntity);
  }

  async find(enterprise,document,state) {
    return this.repository.find(enterprise,document,state);
  }

  list(solicitudVacacionEntity) {
    return this.repository.list(solicitudVacacionEntity);
  }
};