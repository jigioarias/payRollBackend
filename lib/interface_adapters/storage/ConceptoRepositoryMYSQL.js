'use strict';

const sequelize = require('../../frameworks_drivers/database/sequelize');
const Concepto = require('../../enterprise_business_rules/entities/Concepto');

module.exports = class {

  constructor() {
    this.db = sequelize;
    this.model = this.db.model('concepto');
  }

  async persist(conceptoEntity) {
    const {  enterprise, code, description, fittype,accountingcode,conceptType,user,value,percentaje,maxRegisterHour } = conceptoEntity;
    
    const seqconcepto = await this.model.create({  enterprise, code, description, fittype,accountingcode,conceptType,user,value,percentaje,maxRegisterHour });

     await seqconcepto.save();
    
    return new Concepto(seqconcepto.id,  seqconcepto.enterprise, seqconcepto.code, seqconcepto.description, 
      seqconcepto.fittype,seqconcepto.accountingcode,
      seqconcepto.conceptType, seqconcepto.user,seqconcepto.value,
      seqconcepto.percentaje,seqconcepto.maxRegisterHour);
  }

  async merge(conceptoEntity) {
    const seqconcepto = await this.model.findByPk(conceptoEntity.id);

    if (!seqconcepto) return false;

    const { enterprise, code, description, fittype,accountingcode,conceptType,user,value,percentaje,maxRegisterHour } = conceptoEntity;
    await seqconcepto.update({ enterprise, code, description, fittype,accountingcode,conceptType,user,value,percentaje,maxRegisterHour });

    return new Concepto(seqconcepto.id,  seqconcepto.enterprise, seqconcepto.code, seqconcepto.description, seqconcepto.fittype,seqconcepto.accountingcode,seqconcepto.conceptType, seqconcepto.user,seqconcepto.value,seqconcepto.percentaje,seqconcepto.maxRegisterHour);

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

    return new Concepto(seqconcepto.id,  seqconcepto.enterprise, seqconcepto.code, seqconcepto.description, seqconcepto.fittype,seqconcepto.accountingcode,seqconcepto.conceptType, seqconcepto.user,seqconcepto.value,
      seqconcepto.percentaje,seqconcepto.maxRegisterHour);

}


  async find(enterprise) {

     const seqconceptos = await this.model.findAll(
      {
             
        where: {enterprise:enterprise}
      }

     );
    
      return seqconceptos.map((seqconcepto) => {
        return new Concepto(seqconcepto.id,  seqconcepto.enterprise, seqconcepto.code, 
          seqconcepto.description, seqconcepto.fittype,seqconcepto.accountingcode,
          seqconcepto.conceptType, seqconcepto.user,seqconcepto.value,
          seqconcepto.percentaje,seqconcepto.maxRegisterHour);
       
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
          return new Concepto(seqconcepto.id,  seqconcepto.enterprise, 
            seqconcepto.code, seqconcepto.description, seqconcepto.fittype,
            seqconcepto.accountingcode,seqconcepto.conceptType, seqconcepto.user,
            seqconcepto.value,seqconcepto.percentaje
            ,seqconcepto.maxRegisterHour);
      });
      
  }
 

  async findByCode(enterprise,concepto) {

    const seqconcepto = await this.model.findOne(
      {
             
        where: {enterprise:enterprise, 
              code:concepto
        }
      }

    );
  
      
      return new Concepto(seqconcepto.id,  seqconcepto.enterprise, seqconcepto.code, 
        seqconcepto.description, seqconcepto.fittype,seqconcepto.accountingcode,
        seqconcepto.conceptType, seqconcepto.user,seqconcepto.value,
        seqconcepto.percentaje,
        seqconcepto.maxRegisterHour);
  
      
  }

};