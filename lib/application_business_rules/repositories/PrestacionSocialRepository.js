'use strict';

module.exports = class {
  
  constructor(repository) {
    this.repository = repository;
  }

async  persist(prestacionSocialEntity) {
    return this.repository.persist(prestacionSocialEntity);
  }

 async merge(prestacionSocialEntity) {
    return this.repository.merge(prestacionSocialEntity);
  }

 async remove(prestacionSocialEntity) {
    return this.repository.remove(prestacionSocialEntity);
  }

async  get(prestacionSocialEntity) {
    return this.repository.get(prestacionSocialEntity);
  }
  
async  find(prestacionSocialEntity) {
    return this.repository.find(prestacionSocialEntity);
  }
  
  async  findByEmpleadoPeriod(prestacionSocialEntity) {
    return this.repository.findByEmpleadoPeriod(prestacionSocialEntity);
  }
  

};