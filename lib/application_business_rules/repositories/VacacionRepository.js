'use strict';

module.exports = class {
  
  constructor(repository) {
    this.repository = repository;
  }

  persist(vacacionEntity) {
    return this.repository.persist(vacacionEntity);
  }

  
  async find(enterprise, employeeId, year, clase) {
    return this.repository.find(enterprise, employeeId, year, clase);
  }

};