'use strict';

module.exports = class {
  
  constructor(repository) {
    this.repository = repository;
  }

  persist(conceptoNominaEntity) {
    return this.repository.persist(conceptoNominaEntity);
  }

  merge(conceptoNominaEntity) {
    return this.repository.merge(conceptoNominaEntity);
  }

  remove(conceptoNominaId) {
    return this.repository.remove(conceptoNominaId);
  }

  get(userId) {
    return this.repository.get(conceptoNominaId);
  }

  
  find(enterprise,active) {
    return this.repository.find(enterprise,active);
  }
  
  async findByClassPayRoll(enterprise,clase,active) {
    return  await this.repository.findByClassPayRoll(enterprise,clase,active);
  }

};