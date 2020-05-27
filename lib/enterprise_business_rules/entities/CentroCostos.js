'use strict';

module.exports = class {

  constructor(id = null, enterprise, code, description,active,user,branchOffice) {
    this.id = id;
    this.enterprise = enterprise;
    this.code= code;
    this.description = description;
    this.active = active;
    this.user = user;
    console.log('centro costos creada',branchOffice);
    this.branchOffice = branchOffice;
  }


  validarDatos(centroCostos){

    if (centroCostos.description!=""){
            return centroCostos;
     }
     
     console.log('invalid sucursal');
     return null;
     

  }

}