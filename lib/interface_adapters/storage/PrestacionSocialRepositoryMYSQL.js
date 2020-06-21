
'use strict';

const sequelize = require('../../frameworks_drivers/database/sequelize');
const PrestacionSocial = require('../../enterprise_business_rules/entities/PrestacionSocial');

module.exports = class {

  constructor() {
    this.db = sequelize;
    this.model = this.db.model('prestacionsocial');
    }

  async persist(prestacionSocialEntity) {
    
    const {   enterprise,clase, employeeId, document, period,valor,monthSalary,salary,InitDayPay,endDayPay,type,user } = prestacionSocialEntity;
    
    const seqPrestacion = await this.model.create({enterprise,clase, employeeId, document, period,valor,monthSalary,salary,InitDayPay,endDayPay,type,user });
   
    await seqPrestacion.save();   

    
    return new PrestacionSocial(seqPrestacion.id,  seqPrestacion.enterprise, 
        seqPrestacion.clase, seqPrestacion.employeeId, seqPrestacion.document,
        seqPrestacion.period, seqPrestacion.valor, seqPrestacion.monthSalary, 
        seqPrestacion.salary, seqPrestacion.InitDayPay,seqPrestacion.endDayPay, seqPrestacion.type, seqPrestacion.user);
  }

  async merge(prestacionSocialEntity) {
    const seqPrestacion = await this.model.findAll({ where: { enterprise: prestacionSocialEntity.enterprise, clase: prestacionSocialEntity.clase,period:prestacionSocialEntity.period,type:prestacionSocialEntity.type} });

    if (!seqPrestacion) return false;

    const {   enterprise,clase, employeeId, document,period,valor,monthSalary,salary,InitDayPay,endDayPay,type,user } = prestacionSocialEntity;
    await seqPrestacion.update({ enterprise,clase, employeeId, document, period,valor,monthSalary,salary,InitDayPay,endDayPay, type,  user });

    return new PrestacionSocial(seqPrestacion.id,  seqPrestacion.enterprise, 
        seqPrestacion.clase, seqPrestacion.employeeId, seqPrestacion.document,
        seqPrestacion.period, seqPrestacion.valor, seqPrestacion.monthSalary, 
        seqPrestacion.salary, seqPrestacion.InitDayPay,seqPrestacion.endDayPay, seqPrestacion.type, seqPrestacion.user);
     }
    


  async remove(prestacionSocialEntity) {
    const seqPrestacion = await this.model.destroy({ where: { enterprise: prestacionSocialEntity.enterprise, clase: prestacionSocialEntity.clase,period:prestacionSocialEntity.period} });
    if (seqPrestacion) {
      return true;
    }
    return false;
  }

  async get(prestacionSocialEntity) {
    const seqPrestacion = await this.model.findOne({ where: { enterprise: prestacionSocialEntity.enterprise, id:prestacionSocialEntity.id} });

    return new PrestacionSocial(seqPrestacion.id,  seqPrestacion.enterprise, 
        seqPrestacion.clase, seqPrestacion.employeeId, seqPrestacion.document,
        seqPrestacion.period, seqPrestacion.valor, seqPrestacion.monthSalary, 
        seqPrestacion.salary, seqPrestacion.InitDayPay,seqPrestacion.endDayPay, seqPrestacion.type, seqPrestacion.user);
}

 
async find(nominaEntity) {

    const seqPrestaciones = await this.model.findAll({ where: { enterprise: nominaEntity.enterprise, clase: nominaEntity.clase,period:nominaEntity.period,type:nominaEntity.type} });
    
    return seqPrestaciones.map((seqPrestacion) => {
       
        return new PrestacionSocial(seqPrestacion.id,  seqPrestacion.enterprise, 
            seqPrestacion.clase, seqPrestacion.employeeId, seqPrestacion.document,
            seqPrestacion.period, seqPrestacion.valor, seqPrestacion.monthSalary, 
            seqPrestacion.salary, seqPrestacion.InitDayPay,seqPrestacion.endDayPay, seqPrestacion.type, seqPrestacion.user);
        
        });
    
  }
}