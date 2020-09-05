'use strict';

module.exports = class {
  
  constructor(repository) {
    this.repository = repository;
  }

 async persist(grupoConceptosEntity) {
    return this.repository.persist(grupoConceptosEntity);
  }




async findByGroup(grupoConceptosEntity) {
    return this.repository.findByGroup(grupoConceptosEntity);
   
  }
  
  

};