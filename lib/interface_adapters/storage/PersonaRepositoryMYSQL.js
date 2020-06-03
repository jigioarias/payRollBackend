'use strict';

const sequelize = require('../../frameworks_drivers/database/sequelize');
const Persona = require('../../enterprise_business_rules/entities/Persona');

module.exports = class {

  constructor() {
    this.db = sequelize;
    this.model = this.db.model('persona');
  }


  async find() {
    const seqPersonas = await this.model.findAll();
    return seqPersonas.map((seqPersona) => {
      return new Persona(seqPersona.id, seqPersona.firstName, seqPersona.lastName,seqPersona.phone, seqPersona.email, seqPersona.document,seqPersona.typeDocument,seqPersona.salary,seqPersona.nit,
        seqPersona.payRollType,seqPersona.salaryType,seqPersona.active,seqPersona.address,seqPersona.country,
        seqPersona.department,seqPersona.municipality,
        seqPersona.user,seqPersona.civilState
        
  );
    });
 
  }

  async persist(personaEntry) {

  
    const {  firstName, lastName, phone, email,document,typeDocument ,address,country,department,municipality,user,civilState } = personaEntry;

   let seqPersona = await this.model.findOne({ where: { document: document } });
    
    if(seqPersona){
      
    
      return new Persona(seqPersona.id, seqPersona.firstName, seqPersona.lastName,seqPersona.phone, seqPersona.email, seqPersona.document,seqPersona.typeDocument,
        seqPersona.address,seqPersona.country,
        seqPersona.department,seqPersona.municipality,
        seqPersona.user,seqPersona.civilState);
    
    }
  
    console.log('grabando create');

    seqPersona = await this.model.create({ firstName, lastName, phone, email,document,typeDocument ,address,country,department,municipality,user,civilState});
    await seqPersona.save();
    console.log('grabando return');
    
    return new Persona(seqPersona.id, seqPersona.firstName, seqPersona.lastName,seqPersona.phone, seqPersona.email, seqPersona.document,seqPersona.typeDocument,
      seqPersona.address,seqPersona.country,
      seqPersona.department,seqPersona.municipality,
      seqPersona.user,seqPersona.civilState);
  }

  
  async getByDocument(pdocument) {
    const seqPersona = await this.model.findOne({ where: { document: pdocument } });
     
    return new Persona(seqPersona.id, seqPersona.firstName, seqPersona.lastName,seqPersona.phone, seqPersona.email, seqPersona.document,seqPersona.typeDocument,
      seqPersona.address,seqPersona.country,
      seqPersona.department,seqPersona.municipality,
      seqPersona.user,seqPersona.civilState);
  }

  async get(personId) {
    const seqPersona = await this.model.findByPk(personId);
         
    return new Persona(seqPersona.id, seqPersona.firstName, seqPersona.lastName,seqPersona.phone, seqPersona.email, seqPersona.document,seqPersona.typeDocument,
      seqPersona.address,seqPersona.country,
      seqPersona.department,seqPersona.municipality,
      seqPersona.user,seqPersona.civilState);
    }


    async merge(personaEntry) {

      const {  firstName, lastName, phone, email,document,typeDocument ,address,country,department,municipality,user,civilState } = personaEntry;
  
      let seqPersona = await this.model.findOne({ where: { document: document } });
      
    if (!seqPersona) return false;
      
      if(seqPersona){

        console.log(firstName, lastName, phone, email,document,typeDocument ,address,country,department,municipality,user,civilState);
      
       await seqPersona.update({ firstName, lastName, phone, email,document,typeDocument ,address,country,department,municipality,user,civilState});
    
        return new Persona(seqPersona.id, seqPersona.firstName, seqPersona.lastName,seqPersona.phone, seqPersona.email, seqPersona.document,seqPersona.typeDocument,
                          seqPersona.address,seqPersona.country,
                          seqPersona.department,seqPersona.municipality,
                          seqPersona.user,seqPersona.civilState);

      }
    
    
    }

};


