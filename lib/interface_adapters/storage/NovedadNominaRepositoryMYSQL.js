'use strict';

const sequelize = require('../../frameworks_drivers/database/sequelize');
const NovedadNomina = require('../../enterprise_business_rules/entities/NovedadNomina');

module.exports = class {

  constructor() {
    this.db = sequelize;
    this.model = this.db.model('novedadnomina');
  }

  async persist(novedadNominaEntity) {
    
    const {   enterprise,clase, employeeId, document, concept,period,valor,hours,InitDayPay,endDayPay,user,type } = novedadNominaEntity;

    console.log(period,endDayPay,InitDayPay);
    
    const seqNovedadNomina = await this.model.create({enterprise,clase, employeeId, document, concept,period,valor,hours,InitDayPay,endDayPay,user,type });
   
    await seqNovedadNomina.save();   

    
    return new NovedadNomina(seqNovedadNomina.id,  seqNovedadNomina.enterprise, seqNovedadNomina.clase, seqNovedadNomina.employeeId, seqNovedadNomina.document,seqNovedadNomina.concept,
         seqNovedadNomina.period, seqNovedadNomina.valor, seqNovedadNomina.hours, 
         seqNovedadNomina.InitDayPay,seqNovedadNomina.endDayPay,seqNovedadNomina.user, seqNovedadNomina.type);
  }

  async merge(novedadNominaEntity) {
    const seqNovedadNomina = await this.model.findAll({ where: { enterprise: novedadNominaEntity.enterprise, clase: novedadNominaEntity.clase,period:novedadNominaEntity.period} });

    if (!seqNovedadNomina) return false;

    const {   enterprise,clase, employeeId, document, concept,period,valor,hours,InitDayPay,endDayPay,user,type } = novedadNominaEntity;
    await seqNovedadNomina.update({ enterprise,clase, employeeId, document, concept,period,valor,hours,InitDayPay,endDayPay,user,type });

    return new NovedadNomina(seqNovedadNomina.id,  seqNovedadNomina.enterprise, seqNovedadNomina.clase, seqNovedadNomina.employeeId, seqNovedadNomina.document,seqNovedadNomina.concept,
        seqNovedadNomina.period, seqNovedadNomina.valor, seqNovedadNomina.hours, 
        seqNovedadNomina.InitDayPay,seqNovedadNomina.endDayPay,seqNovedadNomina.user,seqNovedadNomina.type);
  }
    


  async remove(novedadNominaEntity) {
    const seqNovedadNomina = await this.model.destroy({ where: { enterprise: novedadNominaEntity.enterprise, clase: novedadNominaEntity.clase,period:novedadNominaEntity.period} });
    if (seqNovedadNomina) {
      return true;
    }
    return false;
  }

  async get(novedadNominaEntity) {
    const seqNovedadNomina = await this.model.findOne({ where: { enterprise: novedadNominaEntity.enterprise, id:novedadNominaEntity.id} });

    return new NovedadNomina(seqNovedadNomina.id,  seqNovedadNomina.enterprise, seqNovedadNomina.clase, seqNovedadNomina.employeeId, seqNovedadNomina.document,seqNovedadNomina.concept,
        seqNovedadNomina.period, seqNovedadNomina.valor, seqNovedadNomina.hours, 
        seqNovedadNomina.InitDayPay,seqNovedadNomina.endDayPay,seqNovedadNomina.user,seqNovedadNomina.type);
}

  async find(novedadNominaEntity) {

    const seqNominas = await this.model.findAll({ where: { enterprise: novedadNominaEntity.enterprise, clase: novedadNominaEntity.clase,period:novedadNominaEntity.period} });
   
      
      return seqNominas.map((seqNovedadNomina) => {
       
        return new NovedadNomina(seqNovedadNomina.id,  seqNovedadNomina.enterprise, seqNovedadNomina.clase, seqNovedadNomina.employeeId, seqNovedadNomina.document,seqNovedadNomina.concept,
            seqNovedadNomina.period, seqNovedadNomina.valor, seqNovedadNomina.hours, 
            seqNovedadNomina.InitDayPay,seqNovedadNomina.endDayPay,seqNovedadNomina.user, seqNovedadNomina.type);
        
        });
    
  }


  async findByEmployee(novedadNominaEntity) {


    const seqNominas = await this.model.findAll({ where: { enterprise: novedadNominaEntity.enterprise, clase: novedadNominaEntity.clase,period:novedadNominaEntity.period,employeeId:novedadNominaEntity.employeeId} });
   
      
      return seqNominas.map((seqNovedadNomina) => {
       
        return new NovedadNomina(seqNovedadNomina.id,  seqNovedadNomina.enterprise, seqNovedadNomina.clase, seqNovedadNomina.employeeId, seqNovedadNomina.document,seqNovedadNomina.concept,
            seqNovedadNomina.period, seqNovedadNomina.valor, seqNovedadNomina.hours, 
            seqNovedadNomina.InitDayPay,seqNovedadNomina.endDayPay,seqNovedadNomina.user);
        
        });
    
  }

};