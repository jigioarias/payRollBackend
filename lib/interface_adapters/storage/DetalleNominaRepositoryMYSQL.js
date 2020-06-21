'use strict';

const sequelize = require('../../frameworks_drivers/database/sequelize');
const DetalleNomina = require('../../enterprise_business_rules/entities/DetalleNomina');
const nomina = require('../../frameworks_drivers/webserver/nomina');

module.exports = class {

  constructor() {
    this.db = sequelize;
    this.model = this.db.model('detallenomina');
  }


  async persist(detalleNominaEntity) {

    
    const {  enterprise, payrollId,employeeId, period,concept,conceptName,valor,percentaje,conceptType, type, user } = detalleNominaEntity;

    
    const seqDetalleNomina = await this.model.create({  enterprise, payrollId,employeeId, period,concept,conceptName,valor,percentaje,conceptType, type, user });
   
    await seqDetalleNomina.save();
    
     return new DetalleNomina(seqDetalleNomina.id,  seqDetalleNomina.enterprise, seqDetalleNomina.payrollId, seqDetalleNomina.employeeId, seqDetalleNomina.concept,seqDetalleNomina.period,  seqDetalleNomina.conceptName, 
        seqDetalleNomina.valor,  seqDetalleNomina.percentaje,  seqDetalleNomina.conceptType, seqDetalleNomina.type, seqDetalleNomina.user);
  }


  async merge(detalleNominaEntity) {
    const seqDetalleNomina = await this.model.findAll({ where: { enterprise: detalleNominaEntity.enterprise, payrollId: detalleNominaEntity.payrollId,period:detalleNominaEntity.period,type:detalleNominaEntity.type} });

    if (!seqDetalleNomina) return false;

    const {  enterprise, payrollId,employeeId, period,concept,conceptName,valor,percentaje,conceptType, type, user } = detalleNominaEntity;
   
    await seqDetalleNomina.update({ enterprise, payrollId,employeeId, period,concept,conceptName,valor,percentaje,conceptType, type, user });
   
    return new DetalleNomina(seqDetalleNomina.id,  seqDetalleNomina.enterprise, seqDetalleNomina.payrollId, seqDetalleNomina.employeeId, seqDetalleNomina.concept,seqDetalleNomina.period,  seqDetalleNomina.conceptName, 
      seqDetalleNomina.valor,  seqDetalleNomina.percentaje,  seqDetalleNomina.conceptType, seqDetalleNomina.type, seqDetalleNomina.user);
  }
    


  async remove(detalleNominaEntity) {
    const seqDetalleNomina = await this.model.destroy({ where: { enterprise: detalleNominaEntity.enterprise, payrollId: detalleNominaEntity.payrollId,period:detalleNominaEntity.period,type:detalleNominaEntity.type} });
    if (seqDetalleNomina) {
      return true;
    }
    return false;
  }

  async get(detalleNominaEntity) {
    const seqDetalleNomina = await this.model.findOne({ where: { enterprise: detalleNominaEntity.enterprise, id:detalleNominaEntity.id} });

   
    return new DetalleNomina(seqDetalleNomina.id,  seqDetalleNomina.enterprise, seqDetalleNomina.payrollId, seqDetalleNomina.employeeId, seqDetalleNomina.concept,seqDetalleNomina.period,  seqDetalleNomina.conceptName, 
      seqDetalleNomina.valor,  seqDetalleNomina.percentaje,  seqDetalleNomina.conceptType, seqDetalleNomina.type, seqDetalleNomina.user);
}

  


async find(detalleNominaEntity) {

    const seqDetalleNominas = await this.model.findAll({ where: { enterprise: detalleNominaEntity.enterprise, payrollId: detalleNominaEntity.payrollId,period:detalleNominaEntity.period,type:detalleNominaEntity.type} });
   
      
      return seqDetalleNominas.map((seqDetalleNomina) => {
        return new DetalleNomina(seqDetalleNomina.id,  seqDetalleNomina.enterprise, seqDetalleNomina.payrollId, seqDetalleNomina.employeeId, seqDetalleNomina.concept,seqDetalleNomina.period,  seqDetalleNomina.conceptName, 
          seqDetalleNomina.valor,  seqDetalleNomina.percentaje,  seqDetalleNomina.conceptType, seqDetalleNomina.type, seqDetalleNomina.user);
        
        });
    
  }


};