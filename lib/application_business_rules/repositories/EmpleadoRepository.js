'use strict';

module.exports = class {
  
  constructor(repository) {
    this.repository = repository;
  }


  async find(enterprise,active) {
    return this.repository.find(enterprise,active);
  }

 async persist(empleadoEntity) {
    return this.repository.persist(empleadoEntity);
  }

  async merge(empleadoEntity) {
    return this.repository.merge(empleadoEntity);
  }

   getByIdPerson(idPerson,active) {
    return this.repository.getByIdPerson(idPerson,active);
  }

  async findByClassPayRoll(enterprise,active,classPayRoll) {
    return this.repository.findByClassPayRoll(enterprise,active,classPayRoll);
  
  }

};