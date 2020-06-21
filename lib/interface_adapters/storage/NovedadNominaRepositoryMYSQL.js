'use strict';

const sequelize = require('../../frameworks_drivers/database/sequelize');
const NovedadNomina = require('../../enterprise_business_rules/entities/NovedadNomina');

module.exports = class {

  constructor() {
    this.db = sequelize;
    this.model = this.db.model('novedadnomina');
  }

  async persist(novedadNominaEntity) {
    
    const {   enterprise,clase, employeeId, document, concept,period,valor,hours,InitDayPay,endDayPay,user } = novedadNominaEntity;
    
    const seqNomina = await this.model.create({enterprise,clase, employeeId, document, concept,period,valor,hours,InitDayPay,endDayPay,user });
   
    await seqNomina.save();   

    
    return new NovedadNomina(seqNomina.id,  seqNomina.enterprise, seqNomina.clase, seqNomina.employeeId, seqNomina.document,seqNomina.concept,
         seqNomina.period, seqNomina.valor, seqNomina.hours, 
         seqNomina.InitDayPay,seqNomina.endDayPay,seqNomina.user);
  }

  async merge(novedadNominaEntity) {
    const seqNomina = await this.model.findAll({ where: { enterprise: novedadNominaEntity.enterprise, clase: novedadNominaEntity.clase,period:novedadNominaEntity.period} });

    if (!seqNomina) return false;

    const {   enterprise,clase, employeeId, document, concept,period,valor,hours,InitDayPay,endDayPay,user } = novedadNominaEntity;
    await seqNomina.update({ enterprise,clase, employeeId, document, concept,period,valor,hours,InitDayPay,endDayPay,user });

    return new NovedadNomina(seqNomina.id,  seqNomina.enterprise, seqNomina.clase, seqNomina.employeeId, seqNomina.document,seqNomina.concept,
        seqNomina.period, seqNomina.valor, seqNomina.hours, 
        seqNomina.InitDayPay,seqNomina.endDayPay,seqNomina.user);
  }
    


  async remove(novedadNominaEntity) {
    const seqNomina = await this.model.destroy({ where: { enterprise: novedadNominaEntity.enterprise, clase: novedadNominaEntity.clase,period:novedadNominaEntity.period} });
    if (seqNomina) {
      return true;
    }
    return false;
  }

  async get(novedadNominaEntity) {
    const seqNomina = await this.model.findOne({ where: { enterprise: novedadNominaEntity.enterprise, id:novedadNominaEntity.id} });

    return new NovedadNomina(seqNomina.id,  seqNomina.enterprise, seqNomina.clase, seqNomina.employeeId, seqNomina.document,seqNomina.concept,
        seqNomina.period, seqNomina.valor, seqNomina.hours, 
        seqNomina.InitDayPay,seqNomina.endDayPay,seqNomina.user);
}

  async find(novedadNominaEntity) {

    const seqNominas = await this.model.findAll({ where: { enterprise: novedadNominaEntity.enterprise, clase: novedadNominaEntity.clase,period:novedadNominaEntity.period} });
   
      
      return seqNominas.map((seqNomina) => {
       
        return new NovedadNomina(seqNomina.id,  seqNomina.enterprise, seqNomina.clase, seqNomina.employeeId, seqNomina.document,seqNomina.concept,
            seqNomina.period, seqNomina.valor, seqNomina.hours, 
            seqNomina.InitDayPay,seqNomina.endDayPay,seqNomina.user);
        
        });
    
  }


  async findByEmployee(novedadNominaEntity) {


    const seqNominas = await this.model.findAll({ where: { enterprise: novedadNominaEntity.enterprise, clase: novedadNominaEntity.clase,period:novedadNominaEntity.period,employeeId:novedadNominaEntity.employeeId} });
   
      
      return seqNominas.map((seqNomina) => {
       
        return new NovedadNomina(seqNomina.id,  seqNomina.enterprise, seqNomina.clase, seqNomina.employeeId, seqNomina.document,seqNomina.concept,
            seqNomina.period, seqNomina.valor, seqNomina.hours, 
            seqNomina.InitDayPay,seqNomina.endDayPay,seqNomina.user);
        
        });
    
  }

};