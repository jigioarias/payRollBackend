'use strict';

module.exports = class {

  constructor(id = null, firstName, lastName, email, password) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
  }


  validarDatos(usuario){
   

                if (usuario.firstName!=""){

                    return usuario;
                }else{
                    console.log('usuario invalido');
                   return null;
                }

  
  }

}