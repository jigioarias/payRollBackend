'use strict';


module.exports = class {

  
 
  
  constructor(id = null, firstName, lastName, phone,email,document,typeDocument,address,country,department,municipality,user,civilState) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.phone = phone;
    this.email = email;
    this.document = document;
    this.typeDocument= typeDocument;
    this.address = address,
    this.country= country,
    this.department= department,
    this.municipality=municipality,
    this.user =user,
    this.civilState = civilState
  }


 
  validarDatos(persona){
   
    if (persona.firstName!=""){

        return persona;
    }
    
    console.log('persona invalido');
    return null;
    


}



}





  

  