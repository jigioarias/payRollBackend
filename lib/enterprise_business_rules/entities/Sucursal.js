'use strict';

module.exports = class {

  constructor(id = null, enterprise, code, address, description,phone,active,user) {
    this.id = id;
    this.enterprise = enterprise;
    this.code= code;
    this.address = address;
    this.description = description;
    this.phone = phone;
    this.active = active;
    this.user = user;
  }


  validarDatos(area){

    if (area.description!=""){
            return area;
     }else{
          console.log('invalid area');
          return null;
     }

  }

}