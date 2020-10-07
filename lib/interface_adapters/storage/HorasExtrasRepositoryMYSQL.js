'use strict';

const sequelize = require('../../frameworks_drivers/database/sequelize');
const NovedadNomina = require('../../enterprise_business_rules/entities/NovedadNomina');

module.exports = class {

  constructor() {
    this.db = sequelize;
    this.model = this.db.model('extraHour');
  }

  async persist(novedadNominaEntity) {
    
    const {   enterprise,clase, employeeId, document, concept,period,valor,hours,InitDayPay,endDayPay,user,type,noveltyDate } = novedadNominaEntity;

    
    const seqNovedadNomina = await this.model.create({enterprise,clase, employeeId, document, concept,period,valor,hours,InitDayPay,endDayPay,user,type,noveltyDate });
   
    await seqNovedadNomina.save();   

    
    return new NovedadNomina(seqNovedadNomina.id,  seqNovedadNomina.enterprise, seqNovedadNomina.clase, seqNovedadNomina.employeeId, seqNovedadNomina.document,seqNovedadNomina.concept,
         seqNovedadNomina.period, seqNovedadNomina.valor, seqNovedadNomina.hours, 
         seqNovedadNomina.InitDayPay,seqNovedadNomina.endDayPay,seqNovedadNomina.user, seqNovedadNomina.type,seqNovedadNomina.noveltyDate);
  }

  async merge(novedadNominaEntity) {

    try {
      
   
   // const seqNovedadNomina = await this.model.findAll({ where: { enterprise: novedadNominaEntity.enterprise, clase: novedadNominaEntity.clase,period:novedadNominaEntity.period} });

    //if (!seqNovedadNomina) return false;

    const {   enterprise,clase, employeeId, document, concept,period,valor,hours,InitDayPay,endDayPay,user,type,noveltyDate } = novedadNominaEntity;
    console.log(noveltyDate);
    
    await  this.model.update({ noveltyDate },
       {
        where: { enterprise: novedadNominaEntity.enterprise, clase: novedadNominaEntity.clase,period:novedadNominaEntity.period}
      }
      
      );

    return true;
  } catch (error) {
    console.log(error);
    return false;
   
  }
}


  async remove(novedadNominaEntity) {
    const seqNovedadNomina = await this.model.destroy({ where: { enterprise: novedadNominaEntity.enterprise, clase: novedadNominaEntity.clase,period:novedadNominaEntity.period,noveltyDate:novedadNominaEntity.noveltyDate} });
    if (seqNovedadNomina) {
      return true;
    }
    return false;
  }

  async removeByConcept(novedadNominaEntity) {
    
    const seqNovedadNomina = await this.model.destroy({ where: { enterprise: novedadNominaEntity.enterprise, clase: novedadNominaEntity.clase,period:novedadNominaEntity.period,concept:novedadNominaEntity.concept} });
    if (seqNovedadNomina) {
      return true;
    }
    return false;
  }


  async get(novedadNominaEntity) {
    const seqNovedadNomina = await this.model.findOne({ where: { enterprise: novedadNominaEntity.enterprise, id:novedadNominaEntity.id} });

    return new NovedadNomina(seqNovedadNomina.id,  seqNovedadNomina.enterprise, seqNovedadNomina.clase, seqNovedadNomina.employeeId, seqNovedadNomina.document,seqNovedadNomina.concept,
        seqNovedadNomina.period, seqNovedadNomina.valor, seqNovedadNomina.hours, 
        seqNovedadNomina.InitDayPay,seqNovedadNomina.endDayPay,seqNovedadNomina.user,seqNovedadNomina.type,seqNovedadNomina.noveltyDate);
}

  async find(novedadNominaEntity) {

    const seqNominas = await this.model.findAll({ where: { enterprise: novedadNominaEntity.enterprise, clase: novedadNominaEntity.clase,period:novedadNominaEntity.period} });
    
      
      return seqNominas.map((seqNovedadNomina) => {
       
        return new NovedadNomina(seqNovedadNomina.id,  seqNovedadNomina.enterprise, seqNovedadNomina.clase, seqNovedadNomina.employeeId, seqNovedadNomina.document,seqNovedadNomina.concept,
            seqNovedadNomina.period, seqNovedadNomina.valor, seqNovedadNomina.hours, 
            seqNovedadNomina.InitDayPay,seqNovedadNomina.endDayPay,seqNovedadNomina.user, seqNovedadNomina.type,seqNovedadNomina.noveltyDate);
        
        });
    
  }


  async findByEmployee(novedadNominaEntity) {


    const seqNominas = await this.model.findAll({ where: { enterprise: novedadNominaEntity.enterprise, clase: novedadNominaEntity.clase,period:novedadNominaEntity.period,employeeId:novedadNominaEntity.employeeId} });
   
      
      return seqNominas.map((seqNovedadNomina) => {
       
        return new NovedadNomina(seqNovedadNomina.id,  seqNovedadNomina.enterprise, seqNovedadNomina.clase, seqNovedadNomina.employeeId, seqNovedadNomina.document,seqNovedadNomina.concept,
            seqNovedadNomina.period, seqNovedadNomina.valor, seqNovedadNomina.hours, 
            seqNovedadNomina.InitDayPay,seqNovedadNomina.endDayPay,seqNovedadNomina.user,seqNovedadNomina.type,seqNovedadNomina.noveltyDate);
        
        });
    
  }

};