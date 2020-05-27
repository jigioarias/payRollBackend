'use strict';

module.exports = class {
  
  constructor(repository) {
    this.repository = repository;
  }


  find() {
    return this.repository.find();
  }

  persist(empleadoEntity) {
    return this.repository.persist(empleadoEntity);
  }

  getByIdPerson(idPerson) {
    return this.repository.getByIdPerson(idPerson);
  }

};