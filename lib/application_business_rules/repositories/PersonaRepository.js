'use strict';

module.exports = class {
  
  constructor(repository) {
    this.repository = repository;
  }


  find() {
    return this.repository.find();
  }

  persist(personaEntity) {
    return this.repository.persist(personaEntity);
  }

  getByDocument(document) {
    return this.repository.getByDocument(document);
  }

  get(document) {
    return this.repository.get(document);
  }



};