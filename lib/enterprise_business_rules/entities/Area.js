'use strict';

module.exports = class {

  constructor(id = null, enterprise, code, unity, description,active,user) {
    this.id = id;
    this.enterprise = enterprise;
    this.code= code;
    this.unity = unity;
    this.description = description;
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