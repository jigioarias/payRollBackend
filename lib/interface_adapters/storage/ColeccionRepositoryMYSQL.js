'use strict';

const sequelize = require('../../frameworks_drivers/database/sequelize');
const Coleccion = require('../../enterprise_business_rules/entities/Coleccion');
const { Op } = require("sequelize");

module.exports = class {

  constructor() {
    this.db = sequelize;
    this.model = this.db.model('coleccion');
  }

  async persist(coleccionEntity) {

    console.log('COLECCION ENTITY::::',coleccionEntity)
    const {  enterprise, name, arn, description, active,user} = coleccionEntity;
    
    const seqcoleccion = await this.model.create({  enterprise,name, arn, description, active,user });

     await seqcoleccion.save();
    
    return new Coleccion(seqcoleccion.id,  seqcoleccion.enterprise,seqcoleccion.name, 
                        seqcoleccion.arn, seqcoleccion.description, 
                        seqcoleccion.active,seqcoleccion.user
                        );
  }

  

  async remove(coleccionId) {
    const seqcoleccion = await this.model.findByPk(coleccionId);
    if (seqcoleccion) {
      return seqcoleccion.destroy();
    }
    return false;
  }

  async get(coleccionId) {
    const seqcoleccion = await this.model.findByPk(coleccionId);

    return new Coleccion(seqcoleccion.id,  seqcoleccion.enterprise,seqcoleccion.name, 
        seqcoleccion.arn, seqcoleccion.description, 
        seqcoleccion.active,seqcoleccion.user
        );

}


  async find(enterprise) {

     const seqcoleccions = await this.model.findAll(
      {
             
        where: {enterprise:enterprise}
      }

     );
    
      return seqcoleccions.map((seqcoleccion) => {
        return new Coleccion(seqcoleccion.id,  seqcoleccion.enterprise,seqcoleccion.name, 
            seqcoleccion.arn, seqcoleccion.description, 
            seqcoleccion.active,seqcoleccion.user
            );
       
        });

  }

  
};