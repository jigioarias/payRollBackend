'use strict';

module.exports = class {
  
  constructor(repository) {
    this.repository = repository;
  }


  async find(enterprise,active) {
    return this.repository.find(enterprise,active);
  }

  persist(empleadoEntity) {
    return this.repository.persist(empleadoEntity);
  }

   getByIdPerson(idPerson) {
    return this.repository.getByIdPerson(idPerson);
  }

};