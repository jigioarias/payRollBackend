'use strict';

const sequelize = require('../../frameworks_drivers/database/sequelize');
const ClaseNomina = require('../../enterprise_business_rules/entities/ClaseNomina');

module.exports = class {

  constructor() {
    this.db = sequelize;
    this.model = this.db.model('clasenomina');
  }

  async persist(claseNominaEntity) {

    

    const {  enterprise, clase, description, vacationdays,vacationprima,primatype,provisionservicedays,provisionservicetype,payrolltype,monthhours,dayshours,bank,bankbranch,account,user,workweek,periodType,active } = claseNominaEntity;
    let seqClaseNomina = await this.model.findOne({ where: { description: claseNominaEntity.description } });
    
    if(seqClaseNomina){
      return new ClaseNomina(seqClaseNomina.id,  seqClaseNomina.enterprise, 
        seqClaseNomina.clase, seqClaseNomina.description, seqClaseNomina.vacationDays,seqClaseNomina.vacationPrima,
          seqClaseNomina.primatype, seqClaseNomina.provisionservicedays, seqClaseNomina.provisionservicetype, 
          seqClaseNomina.payrolltype, seqClaseNomina.monthhours, seqClaseNomina.dayshours, 
          seqClaseNomina.bank,  seqClaseNomina.bankbranch,  seqClaseNomina.account, 
          seqClaseNomina.user,seqClaseNomina.workweek,seqClaseNomina.periodType,seqClaseNomina.active);
    }

   
    seqClaseNomina = await this.model.create({  enterprise, clase, 
      description, vacationdays,vacationprima,primatype,provisionservicedays,provisionservicetype,payrolltype,monthhours,
      dayshours,bank,bankbranch,account,user,workweek,periodType,active });
    
    await seqClaseNomina.save();
    
    return new ClaseNomina(seqClaseNomina.id,  seqClaseNomina.enterprise, 
      seqClaseNomina.clase, seqClaseNomina.description, seqClaseNomina.vacationDays,seqClaseNomina.vacationPrima,
        seqClaseNomina.primatype, seqClaseNomina.provisionservicedays, seqClaseNomina.provisionservicetype, 
        seqClaseNomina.payrolltype, seqClaseNomina.monthhours, seqClaseNomina.dayshours, 
        seqClaseNomina.bank,  seqClaseNomina.bankbranch,  seqClaseNomina.account, 
        seqClaseNomina.user,seqClaseNomina.workweek,seqClaseNomina.periodType,seqClaseNomina.active);
  }

  async merge(claseNominaEntity) {
    const seqClaseNomina = await this.model.findByPk(claseNominaEntity.id);

    if (!seqClaseNomina) return false;

    const {  enterprise, clase, description, vacationdays,vacationprima,primatype,provisionservicedays,provisionservicetype,payrolltype,monthhours,dayshours,bank,bankbranch,account,user,workweek,periodType,active } = claseNominaEntity;
    
    await seqClaseNomina.update({  enterprise, clase, description, vacationdays,vacationprima,primatype,provisionservicedays,provisionservicetype,payrolltype,monthhours,
      dayshours,bank,bankbranch,account,user,workweek,periodType,active });

    return new ClaseNomina(seqClaseNomina.id,  seqClaseNomina.enterprise, seqClaseNomina.clase, seqClaseNomina.description, seqClaseNomina.vacationDays,seqClaseNomina.vacationPrima,
      seqClaseNomina.primatype, seqClaseNomina.provisionservicedays, seqClaseNomina.provisionservicetype, seqClaseNomina.payrolltype, seqClaseNomina.monthhours, seqClaseNomina.dayshours, 
      seqClaseNomina.bank,  seqClaseNomina.bankbranch,  seqClaseNomina.account, seqClaseNomina.user,seqClaseNomina.workweek,seqClaseNomina.periodType,seqClaseNomina.active);

    }

  async remove(claseNominaId) {
    const seqClaseNomina = await this.model.findByPk(claseNominaId);
    if (seqClaseNomina) {
      return seqClaseNomina.destroy();
    }
    return false;
  }

  async get(claseNominaId) {
    const seqClaseNomina = await this.model.findByPk(claseNominaId);

    return new ClaseNomina(seqClaseNomina.id,  seqClaseNomina.enterprise, seqClaseNomina.clase, seqClaseNomina.description, seqClaseNomina.vacationdays,seqClaseNomina.vacationprima,
      seqClaseNomina.primatype, seqClaseNomina.provisionservicedays, seqClaseNomina.provisionservicetype, seqClaseNomina.payrolltype, seqClaseNomina.monthhours, seqClaseNomina.dayshours, 
      seqClaseNomina.bank,  seqClaseNomina.bankbranch,  seqClaseNomina.account, 
      seqClaseNomina.user,seqClaseNomina.workweek,seqClaseNomina.periodType,seqClaseNomina.active);

}

  async getByDescription(description) {
    const seqClaseNomina = await this.model.findOne({ where: { description: description } });
    return new ClaseNomina(seqClaseNomina.id,  seqClaseNomina.enterprise, seqClaseNomina.clase, seqClaseNomina.description, seqClaseNomina.vacationdays,seqClaseNomina.vacationprima,
      seqClaseNomina.primatype, seqClaseNomina.provisionservicedays, seqClaseNomina.provisionservicetype, seqClaseNomina.payrolltype, seqClaseNomina.monthhours, seqClaseNomina.dayshours, 
      seqClaseNomina.bank,  seqClaseNomina.bankbranch,  seqClaseNomina.account, 
      seqClaseNomina.user,seqClaseNomina.workweek,seqClaseNomina.periodType,seqClaseNomina.active);
}

  async find() {

    const seqClaseNominas = await this.model.findAll();
    
    return seqClaseNominas.map((seqClaseNomina) => {
        return new ClaseNomina(seqClaseNomina.id,  seqClaseNomina.enterprise, seqClaseNomina.clase, seqClaseNomina.description, seqClaseNomina.vacationDays,seqClaseNomina.vacationPrima,
          seqClaseNomina.primatype, seqClaseNomina.provisionservicedays, seqClaseNomina.provisionservicetype, seqClaseNomina.payrolltype, seqClaseNomina.monthhours, seqClaseNomina.dayshours, 
          seqClaseNomina.bank,  seqClaseNomina.bankbranch,  seqClaseNomina.account, seqClaseNomina.user,seqClaseNomina.workweek,seqClaseNomina.periodType,seqClaseNomina.active);
        
        });

  
  }
  async getByState(claseNominaEntity) {

    const seqClaseNominas = await this.model.findAll(
      {
        where: {enterprise:claseNominaEntity.enterprise,
                active:claseNominaEntity.active
                }}
    );
    
    return seqClaseNominas.map((seqClaseNomina) => {
        return new ClaseNomina(seqClaseNomina.id,  seqClaseNomina.enterprise, seqClaseNomina.clase, seqClaseNomina.description, seqClaseNomina.vacationDays,seqClaseNomina.vacationPrima,
          seqClaseNomina.primatype, seqClaseNomina.provisionservicedays, seqClaseNomina.provisionservicetype, seqClaseNomina.payrolltype, seqClaseNomina.monthhours, seqClaseNomina.dayshours, 
          seqClaseNomina.bank,  seqClaseNomina.bankbranch,  seqClaseNomina.account, seqClaseNomina.user,seqClaseNomina.workweek,seqClaseNomina.periodType,seqClaseNomina.active);
        
        });

  
  }

};