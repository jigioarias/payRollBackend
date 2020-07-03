'use strict';

module.exports = class {
  
  constructor(repository) {
    this.repository = repository;
  }

  async persist(calendarioLaboralEntity) {
    return this.repository.persist(calendarioLaboralEntity);
  }

  async merge(calendarioLaboralEntity) {
    return this.repository.merge(calendarioLaboralEntity);
  }

  async remove(semanaLaboralId) {
    return this.repository.remove(semanaLaboralId);
  }

 async get(semanaLaboralId) {
     
    return this.repository.get(semanaLaboralId);
  }

  async getDatesByDate(calendarioLaboralEntity,fechaInicial,fechaFinal) {
    return this.repository.getDatesByDate(calendarioLaboralEntity,fechaInicial,fechaFinal);
  }

  async getDaysRangeDate(calendarioLaboralEntity,fechaInicial,fechaFinal) {

  return  this.repository.getDaysRangeDate(calendarioLaboralEntity,fechaInicial,fechaFinal);
  }


  async find(calendarioLaboralEntity) {
    return this.repository.find(calendarioLaboralEntity);
  }

};