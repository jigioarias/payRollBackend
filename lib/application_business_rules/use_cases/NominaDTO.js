'use strict';


module.exports = class {

  
  novedades = null;

  constructor(payRoll,payRollDetail,listaNovedades) {
     this.payRoll= payRoll;
    this.payRollDetail = payRollDetail;
    this.novedades =  listaNovedades;
  }


  setNovedades(novedad){ 
    this.novedades.push(novedad);
   }


}





  

  