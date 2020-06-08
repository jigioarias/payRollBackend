'use strict';

const sequelize = require('../../frameworks_drivers/database/sequelize');
const Concepto = require('../../enterprise_business_rules/entities/Concepto');

module.exports = class {

  constructor() {
    this.db = sequelize;
    this.model = this.db.model('concepto');
  }

  async persist(conceptoEntity) {
    const {  enterprise, code, description, fittype,accountingcode,conceptType,user } = conceptoEntity;
    
    const seqconcepto = await this.model.create({  enterprise, code, description, fittype,accountingcode,conceptType,user });

     await seqconcepto.save();
    
    return new Concepto(seqconcepto.id,  seqconcepto.enterprise, seqconcepto.code, seqconcepto.description, seqconcepto.fittype,seqconcepto.accountingcode,seqconcepto.conceptType, seqconcepto.user);
  }

  async merge(conceptoEntity) {
    const seqconcepto = await this.model.findByPk(conceptoEntity.id);

    if (!seqconcepto) return false;

    const { enterprise, code, description, fittype,accountingcode,conceptType,user } = conceptoEntity;
    await seqconcepto.update({ enterprise, code, description, fittype,accountingcode,conceptType,user });

    return new Concepto(seqconcepto.id,  seqconcepto.enterprise, seqconcepto.code, seqconcepto.description, seqconcepto.fittype,seqconcepto.accountingcode,seqconcepto.conceptType, seqconcepto.user);

    }

  async remove(conceptoId) {
    const seqconcepto = await this.model.findByPk(conceptoId);
    if (seqconcepto) {
      return seqconcepto.destroy();
    }
    return false;
  }

  async get(conceptoId) {
    const seqconcepto = await this.model.findByPk(conceptoId);

    return new Concepto(seqconcepto.id,  seqconcepto.enterprise, seqconcepto.code, seqconcepto.description, seqconcepto.fittype,seqconcepto.accountingcode,seqconcepto.conceptType, seqconcepto.user);

}


  async find(enterprise,active) {

     const seqconceptos = await this.model.findAll(
      {
             
        where: {enterprise:enterprise}
      }

     );
    
      return seqconceptos.map((seqconcepto) => {
        return new Concepto(seqconcepto.id,  seqconcepto.enterprise, seqconcepto.code, seqconcepto.description, seqconcepto.fittype,seqconcepto.accountingcode,seqconcepto.conceptType, seqconcepto.user);
       
        });

  }

  async findByType(enterprise,conceptType) {

    const seqconceptos = await this.model.findAll(
      {
             
        where: {enterprise:enterprise, 
              conceptType:conceptType
        }
      }

    );
   
     return seqconceptos.map((seqconcepto) => {
       return new Concepto(seqconcepto.id,  seqconcepto.enterprise, seqconcepto.code, seqconcepto.description, seqconcepto.fittype,seqconcepto.accountingcode,seqconcepto.conceptType, seqconcepto.user);
      
       });
      
      }
 

};