'use strict';

module.exports = class {
  
  constructor(repository) {
    this.repository = repository;
  }

  persist(userEntity) {
    return this.repository.persist(userEntity);
  }

  merge(userEntity) {
    return this.repository.merge(userEntity);
  }

  remove(userId) {
    return this.repository.remove(userId);
  }

  get(userId) {
    return this.repository.get(userId);
  }

  getByEmail(email) {
    return this.repository.getByEmail(email);
  }
  
  getByUser(user) {
   // console.log('user en repositorio',user);
    return this.repository.getByUser(user.email,user.password);
  }
  

  
  find() {
    return this.repository.find();
  }

};