'use strict';

module.exports = class {
    
  constructor(id = null, enterprise,name, arn, description, active,user) {
    this.id = id;
    this.enterprise = enterprise;

    this.description = description;
    this.name = name;
    this.arn = arn;
    this.user = user;
    this.active = active;
   
  }


  

}
      