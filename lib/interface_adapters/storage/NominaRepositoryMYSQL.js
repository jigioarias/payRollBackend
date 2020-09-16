'use strict';

const sequelize = require('../../frameworks_drivers/database/sequelize');
const Nomina = require('../../enterprise_business_rules/entities/Nomina');
const nomina = require('../../frameworks_drivers/webserver/nomina');

module.exports = class {

  constructor() {
    this.db = sequelize;
    this.model = this.db.model('nomina');
  }

  async persist(nominaEntity) {
    
    const {   enterprise,clase, employeeId, document, name,address,email,phone,period,valor,monthSalary,salary,InitDayPay,endDayPay,type,days,user,ibc } = nominaEntity;
    
    const seqNomina = await this.model.create({enterprise,clase, employeeId, document, name,address,email,phone,period,valor,monthSalary,salary,InitDayPay,endDayPay,type,days,user,ibc });
   
    await seqNomina.save();   

    
    return new Nomina(seqNomina.id,  seqNomina.enterprise, seqNomina.clase, seqNomina.employeeId, seqNomina.document,seqNomina.name,
        seqNomina.address, seqNomina.email, seqNomina.phone, seqNomina.period, seqNomina.valor, seqNomina.monthSalary, 
        seqNomina.salary, seqNomina.InitDayPay,seqNomina.endDayPay, seqNomina.type, seqNomina.days,seqNomina.user,seqNomina.ibc);
  }

  async merge(nominaEntity) {

    //console.log('n:;;;',nominaEntity);
  //  const seqNominas = await this.model.findAll({ where: { enterprise: nominaEntity.enterprise, clase: nominaEntity.clase,period:nominaEntity.period,type:nominaEntity.type} });
    //const  idNomina = seqNomina.id;
    
    //if (!seqNominas) return false;
    try {

    const {   enterprise,clase, employeeId, document, name,address,email,phone,period,valor,monthSalary,salary,InitDayPay,endDayPay,type,days,user,ibc } = nominaEntity;
     await this.model.update({ type: type},{ where: { enterprise: enterprise, clase: clase,period:period} });

    return true;

  
} catch (error) {
  console.log(error);
  return false;
}

    }
    


  async remove(nominaEntity) {
    const seqNomina = await this.model.destroy({ where: { enterprise: nominaEntity.enterprise, clase: nominaEntity.clase,period:nominaEntity.period,type:nominaEntity.type} });
    if (seqNomina) {
      return true;
    }
    return false;
  }

  async get(nominaEntity) {
    const seqNomina = await this.model.findOne({ where: { enterprise: nominaEntity.enterprise, id:nominaEntity.id} });

    return new Nomina(seqNomina.id,  seqNomina.enterprise, seqNomina.clase, seqNomina.employeeId, seqNomina.document,seqNomina.name,
      seqNomina.address, seqNomina.email, seqNomina.phone, seqNomina.period, seqNomina.valor, seqNomina.monthSalary, 
      seqNomina.salary, seqNomina.InitDayPay,seqNomina.endDayPay, seqNomina.type, seqNomina.days,seqNomina.user,seqNomina.ibc);
}

  async find(nominaEntity) {

    const seqNominas = await this.model.findAll({ where: { enterprise: nominaEntity.enterprise, clase: nominaEntity.clase,period:nominaEntity.period,type:nominaEntity.type} });
   
      
      return seqNominas.map((seqNomina) => {
       
        return new Nomina(seqNomina.id,  seqNomina.enterprise, seqNomina.clase, seqNomina.employeeId, seqNomina.document,seqNomina.name,
          seqNomina.address, seqNomina.email, seqNomina.phone, seqNomina.period, seqNomina.valor, seqNomina.monthSalary, 
          seqNomina.salary, seqNomina.InitDayPay,seqNomina.endDayPay, seqNomina.type, seqNomina.days,seqNomina.user,seqNomina.ibc);
        
        });
    
  }

};