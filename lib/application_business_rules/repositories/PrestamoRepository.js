'use strict';

module.exports = class {
  
  constructor(repository) {
    this.repository = repository;
  }

  persist(prestamoEntity) {
    return this.repository.persist(prestamoEntity);
  }

  async merge(prestamoEntity) {
    return await this.repository.merge(prestamoEntity);
  }

  
  async find(enterprise, employeeId, year, clase,state) {
    return this.repository.find(enterprise, employeeId, year, clase,state);
  }

};