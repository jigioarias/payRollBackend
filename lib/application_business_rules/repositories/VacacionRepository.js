'use strict';

module.exports = class {
  
  constructor(repository) {
    this.repository = repository;
  }

  persist(vacacionEntity) {
    return this.repository.persist(vacacionEntity);
  }

  
  async find(enterprise,document,year,clase,initDate,endDate) {
    return this.repository.find(enterprise,document,year,clase,initDate,endDate);
  }

};