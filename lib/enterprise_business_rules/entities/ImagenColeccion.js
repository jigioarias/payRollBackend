'use strict';

module.exports = class {
    
  constructor(id = null, enterprise,coleccion,documento, faceId, imagenId, active,user) {
    this.id = id;
    this.coleccion = coleccion;
    this.enterprise = enterprise;
    this.documento = documento;
    this.faceId = faceId;
    this.imagenId = imagenId;
    this.user = user;
    this.active = active;
   
  }


  

}
      