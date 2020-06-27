
'use strict';

const sequelize = require('../../frameworks_drivers/database/sequelize');
const PrestacionSocial = require('../../enterprise_business_rules/entities/PrestacionSocial');

module.exports = class {

  constructor() {
    this.db = sequelize;
    this.model = this.db.model('prestacionsocial');
    }

  async persist(prestacionSocialEntity) {
    
    const {   enterprise,clase, employeeId, document, period,valor,monthSalary,salary,InitDayPay,endDayPay,type,user,discount } = prestacionSocialEntity;
    
    const seqPrestacion = await this.model.create({enterprise,clase, employeeId, document, period,valor,monthSalary,salary,InitDayPay,endDayPay,type,user,discount });
   
    await seqPrestacion.save();   

    
    return new PrestacionSocial(seqPrestacion.id,  seqPrestacion.enterprise, 
        seqPrestacion.clase, seqPrestacion.employeeId, seqPrestacion.document,
        seqPrestacion.period, seqPrestacion.valor, seqPrestacion.monthSalary, 
        seqPrestacion.salary, seqPrestacion.InitDayPay,seqPrestacion.endDayPay, seqPrestacion.type, seqPrestacion.user,seqPrestacion.discount);
  }

  async merge(prestacionSocialEntity) {
    const seqPrestacion = await this.model.findAll({ where: { enterprise: prestacionSocialEntity.enterprise, clase: prestacionSocialEntity.clase,period:prestacionSocialEntity.period,type:prestacionSocialEntity.type} });

    if (!seqPrestacion) return false;

    const {   enterprise,clase, employeeId, document,period,valor,monthSalary,salary,InitDayPay,endDayPay,type,user,discount } = prestacionSocialEntity;
    await seqPrestacion.update({ enterprise,clase, employeeId, document, period,valor,monthSalary,salary,InitDayPay,endDayPay, type,  user,discount });

    return new PrestacionSocial(seqPrestacion.id,  seqPrestacion.enterprise, 
        seqPrestacion.clase, seqPrestacion.employeeId, seqPrestacion.document,
        seqPrestacion.period, seqPrestacion.valor, seqPrestacion.monthSalary, 
        seqPrestacion.salary, seqPrestacion.InitDayPay,seqPrestacion.endDayPay, seqPrestacion.type, seqPrestacion.user,seqPrestacion.discount);
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
        seqPrestacion.salary, seqPrestacion.InitDayPay,seqPrestacion.endDayPay, seqPrestacion.type, seqPrestacion.user,seqPrestacion.discount);
}

 
async find(prestacionSolcialEntity) {

    const seqPrestaciones = await this.model.findAll({ where: { enterprise: prestacionSolcialEntity.enterprise, clase: prestacionSolcialEntity.clase,period:prestacionSolcialEntity.period,type:prestacionSolcialEntity.type} });
    
    return seqPrestaciones.map((seqPrestacion) => {
       
        return new PrestacionSocial(seqPrestacion.id,  seqPrestacion.enterprise, 
            seqPrestacion.clase, seqPrestacion.employeeId, seqPrestacion.document,
            seqPrestacion.period, seqPrestacion.valor, seqPrestacion.monthSalary, 
            seqPrestacion.salary, seqPrestacion.InitDayPay,seqPrestacion.endDayPay, seqPrestacion.type, seqPrestacion.user,seqPrestacion.discount);
        
        });
    
  }

  async findByEmpleadoPeriod(prestacionSolcialEntity) {

    

    const seqPrestaciones = await this.model.findOne({ 
                                                    attributes: [ [sequelize.fn('sum', sequelize.col('valor')), 'totalVacaciones']],
                                                    where: { enterprise: prestacionSolcialEntity.enterprise, 
                                                      type:prestacionSolcialEntity.type,
                                                      document:prestacionSolcialEntity.document,
                                                      discount : prestacionSolcialEntity.discount
                                                    },
                                                    raw: true
                                                  
                                                  });
    
    return seqPrestaciones;
  }

}