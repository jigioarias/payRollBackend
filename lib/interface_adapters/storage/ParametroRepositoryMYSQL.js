'use strict';

const sequelize = require('../../frameworks_drivers/database/sequelize');
const Parametro = require('../../enterprise_business_rules/entities/Parametro');

module.exports = class {

  constructor() {
    this.db = sequelize;
    this.model = this.db.model('parametro');
  }

  async persist(parametroEntity) {
    const {  enterprise, code, description, value,type,active,user } = parametroEntity;
    
    const seqperiodo = await this.model.create({  enterprise, code, description, value,type,active,user});

     await seqperiodo.save();
    
    return new Parametro(seqperiodo.id,  seqperiodo.enterprise, seqperiodo.code, seqperiodo.description, seqperiodo.value,seqperiodo.type,seqperiodo.active, seqperiodo.user);
  }

  async merge(parametroEntity) {
    const seqperiodo = await this.model.findByPk(parametroEntity.id);

    if (!seqperiodo) return false;

    const { enterprise, code, description, fittype,accountingcode,conceptType,user,value,percentaje } = parametroEntity;
    await seqperiodo.update({ enterprise, code, description, fittype,accountingcode,conceptType,user,value,percentaje });

    return new Parametro(seqperiodo.id,  seqperiodo.enterprise, seqperiodo.code, seqperiodo.description, seqperiodo.value,seqperiodo.type,seqperiodo.active, seqperiodo.user);

    }

  async remove(ParametroId) {
    const seqperiodo = await this.model.findByPk(ParametroId);
    if (seqperiodo) {
      return seqperiodo.destroy();
    }
    return false;
  }

  async get(ParametroId) {
    const seqperiodo = await this.model.findByPk(ParametroId);

    return new Parametro(seqperiodo.id,  seqperiodo.enterprise, seqperiodo.code, seqperiodo.description, seqperiodo.value,seqperiodo.type,seqperiodo.active, seqperiodo.user);

}


  async findByDescription(enterprise,description) {

    try {
        
     const seqperiodos = await this.model.findAll(
      {
             
        where: {enterprise:enterprise,
                description:description
            }
      }

     );
    
      return seqperiodos.map((seqperiodo) => {
        return new Parametro(seqperiodo.id,  seqperiodo.enterprise, seqperiodo.code, seqperiodo.description, seqperiodo.value,seqperiodo.type,seqperiodo.active, seqperiodo.user);
       
        });

    } catch (error) {
        console.log(error);
       return null;   
    }
  }

  async find(enterprise,active) {

    const seqperiodos = await this.model.findAll(
      {
             
        where: {enterprise:enterprise, 
                active:active
        }
      }

    );
   
     return seqperiodos.map((seqperiodo) => {
        return new Parametro(seqperiodo.id,  seqperiodo.enterprise, seqperiodo.code, seqperiodo.description, seqperiodo.value,seqperiodo.type,seqperiodo.active, seqperiodo.user);
    });
      
      }
 

};