'use strict';

module.exports = class {
  
  constructor(repository) {
    this.repository = repository;
  }

  async persist(periodclassEntity) {
    return this.repository.persist(periodclassEntity);
  }

 async merge(periodclassEntity) {
    return this.repository.merge(periodclassEntity);
  }

  remove(periodclassId) {
    return this.repository.remove(periodclassId);
  }

  get(periodclassId) {
    return this.repository.get(periodclassId);
  }

  async find() {
    return this.repository.find();
  }

  async findByClassPayRoll(enterprise,clase,active) {

    return this.repository.findByClassPayRoll(enterprise,clase,active);
  }


  async findByPeriod(period){

    return this.repository.findByPeriod(period);

  }

};