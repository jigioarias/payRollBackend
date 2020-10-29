'use strict';

module.exports = class {
  
  constructor(repository) {
    this.repository = repository;
  }

  persist(periodoPrestamoEntity) {
    return this.repository.persist(periodoPrestamoEntity);
  }

  
  async find(enterprise, employeeId,state,period) {
    return this.repository.find(enterprise, employeeId,state,period);
  }

  async get(id) {
    return this.repository.get(id);
  }
};