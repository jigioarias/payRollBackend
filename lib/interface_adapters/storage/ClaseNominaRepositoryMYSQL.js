'use strict';

const sequelize = require('../../frameworks_drivers/database/sequelize');
const ClaseNomina = require('../../enterprise_business_rules/entities/ClaseNomina');

module.exports = class {

  constructor() {
    this.db = sequelize;
    this.model = this.db.model('clasenomina');
  }

  async persist(claseNominaEntity) {
    const {  enterprise, clase, description, vacationdays,vacationprima,primatype,provisionservicedays,provisionservicetype,payrolltype,monthhours,dayshours,bank,bankbranch,account,user } = claseNominaEntity;
    
    
    

    const seqClaseNomina = await this.model.create({  enterprise, clase, description, vacationdays,vacationprima,primatype,provisionservicedays,provisionservicetype,payrolltype,monthhours,dayshours,bank,bankbranch,account,user });


    
    await seqClaseNomina.save();
    
    return new ClaseNomina(seqClaseNomina.id,  seqClaseNomina.enterprise, seqClaseNomina.clase, seqClaseNomina.description, seqClaseNomina.vacationDays,seqClaseNomina.vacationPrima,
        seqClaseNomina.primatype, seqClaseNomina.provisionservicedays, seqClaseNomina.provisionservicetype, seqClaseNomina.payrolltype, seqClaseNomina.monthhours, seqClaseNomina.dayshours, 
        seqClaseNomina.bank,  seqClaseNomina.bankbranch,  seqClaseNomina.account, seqClaseNomina.user);
  }

  async merge(claseNominaEntity) {
    const seqClaseNomina = await this.model.findByPk(claseNominaEntity.id);

    if (!seqClaseNomina) return false;

    const { enterprise, code, unity, description,active,user } = claseNominaEntity;
    await seqClaseNomina.update({ enterprise, code, unity, description,active,user });

    return new ClaseNomina(seqClaseNomina.id,  seqClaseNomina.enterprise, seqClaseNomina.clase, seqClaseNomina.description, seqClaseNomina.vacationDays,seqClaseNomina.vacationPrima,
        seqClaseNomina.primatype, seqClaseNomina.provisionservicedays, seqClaseNomina.provisionservicetype, seqClaseNomina.payrolltype, seqClaseNomina.monthhours, seqClaseNomina.dayshours, 
        seqClaseNomina.bank,  seqClaseNomina.bankbranch,  seqClaseNomina.account, seqClaseNomina.user);

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

    return new ClaseNomina(seqClaseNomina.id,  seqClaseNomina.enterprise, seqClaseNomina.clase, seqClaseNomina.description, seqClaseNomina.vacationDays,seqClaseNomina.vacationPrima,
        seqClaseNomina.primatype, seqClaseNomina.provisionservicedays, seqClaseNomina.provisionservicetype, seqClaseNomina.payrolltype, seqClaseNomina.monthhours, seqClaseNomina.dayshours, 
        seqClaseNomina.bank,  seqClaseNomina.bankbranch,  seqClaseNomina.account, seqClaseNomina.user);

}

  async getByDescription(description) {
    console.log('consultandoi por des',description);
    const seqClaseNomina = await this.model.findOne({ where: { description: description } });
    return new ClaseNomina(seqClaseNomina.id,  seqClaseNomina.enterprise, seqClaseNomina.clase, seqClaseNomina.description, seqClaseNomina.vacationDays,seqClaseNomina.vacationPrima,
        seqClaseNomina.primatype, seqClaseNomina.provisionservicedays, seqClaseNomina.provisionservicetype, seqClaseNomina.payrolltype, seqClaseNomina.monthhours, seqClaseNomina.dayshours, 
        seqClaseNomina.bank,  seqClaseNomina.bankbranch,  seqClaseNomina.account, seqClaseNomina.user);
}

  async find() {


    const seqClaseNominas = await this.model.findAll();
   
      
      return seqClaseNominas.map((seqClaseNomina) => {
       
        return new ClaseNomina(seqClaseNomina.id,  seqClaseNomina.enterprise, seqClaseNomina.clase, seqClaseNomina.description, seqClaseNomina.vacationDays,seqClaseNomina.vacationPrima,
          seqClaseNomina.primatype, seqClaseNomina.provisionservicedays, seqClaseNomina.provisionservicetype, seqClaseNomina.payrolltype, seqClaseNomina.monthhours, seqClaseNomina.dayshours, 
          seqClaseNomina.bank,  seqClaseNomina.bankbranch,  seqClaseNomina.account, seqClaseNomina.user);  
        
        });


      

   
  }

};