'use strict';

module.exports = class {
  
  constructor(repository) {
    this.repository = repository;
  }


  async find() {
    return this.repository.find();
  }

 async persist(personaEntity) {
  return this.repository.persist(personaEntity);
  }

  async merge(personaEntity) {
    return this.repository.merge(personaEntity);
  }

  async remove(idPerson) {
    return this.repository.remove(idPerson);
  }
  
  async getByDocument(document) {
    return this.repository.getByDocument(document);
  }

  async get(document) {
    return this.repository.get(document);
  }



};