'use strict';

module.exports = class {
  
  constructor(repository) {
    this.repository = repository;
  }


  find() {
    return this.repository.find();
  }

 async persist(personaEntity) {
    console.log(personaEntity);
  return this.repository.persist(personaEntity);
  }

  async merge(personaEntity) {
    return this.repository.merge(personaEntity);
  }

  async getByDocument(document) {
    return this.repository.getByDocument(document);
  }

  get(document) {
    return this.repository.get(document);
  }



};