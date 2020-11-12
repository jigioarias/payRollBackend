'use strict';

module.exports = class {
  
  constructor(repository) {
    this.repository = repository;
  }


  async find(empleado) {
    return this.repository.find(empleado);
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

  getById(idEmployee) {
    return this.repository.getById(idEmployee);
  }
  
  getByIdPerson(idPerson) {
    return this.repository.getByIdPerson(idPerson);
  }
  
  async findByClassPayRoll(enterprise,active,classPayRoll) {
    return this.repository.findByClassPayRoll(enterprise,active,classPayRoll);
  
  }

};