'use strict';

const sequelize = require('../../frameworks_drivers/database/sequelize');
const SemanaLaboral = require('../../enterprise_business_rules/entities/SemanaLaboral');

module.exports = class {

  constructor() {
    this.db = sequelize;
    this.model = this.db.model('semanalaboral');
  }

  async persist(semanaLaboralEntity) {
    const {  enterprise,  description, workcalendar,user} = semanaLaboralEntity;
    
    const seqSemanaLaboral = await this.model.create({  enterprise,  description, workcalendar,user });
   
    await seqSemanaLaboral.save();
    
    return new SemanaLaboral(seqSemanaLaboral.id,  seqSemanaLaboral.enterprise,  seqSemanaLaboral.description, seqSemanaLaboral.workcalendar,seqSemanaLaboral.user);
  }

  async merge(semanaLaboralEntity) {
    const seqSemanaLaboral = await this.model.findByPk(semanaLaboralEntity.id);

    if (!seqSemanaLaboral) return false;

    const {  enterprise,  description, workcalenar,user} = semanaLaboralEntity;
    await seqSemanaLaboral.update({ enterprise,  description, workcalenar,user });

    return new SemanaLaboral(seqSemanaLaboral.id,  seqSemanaLaboral.enterprise,  seqSemanaLaboral.description, seqSemanaLaboral.workcalendar, seqSemanaLaboral.user);

    }

  async remove(semanaLaboralId) {
    const seqSemanaLaboral = await this.model.findByPk(semanaLaboralId);
    if (seqSemanaLaboral) {
      return seqSemanaLaboral.destroy();
    }
    return false;
  }

  async get(semanaLaboralId) {

    const seqSemanaLaboral = await this.model.findByPk(semanaLaboralId);    

    return new SemanaLaboral(seqSemanaLaboral.id,  seqSemanaLaboral.enterprise,  seqSemanaLaboral.description, seqSemanaLaboral.workcalendar, seqSemanaLaboral.user);


}

  async getByDescription(description) {
    
    const seqSemanaLaboral = await this.model.findOne({ where: { description: description } });
    return new SemanaLaboral(seqSemanaLaboral.id,  seqSemanaLaboral.enterprise,  seqSemanaLaboral.description, seqSemanaLaboral.workcalendar, seqSemanaLaboral.user);

}

  async find() {


    const seqClaseNominas = await this.model.findAll();
   
      
      return seqClaseNominas.map((seqSemanaLaboral) => {
        return new SemanaLaboral(seqSemanaLaboral.id,  seqSemanaLaboral.enterprise,  seqSemanaLaboral.description, seqSemanaLaboral.workcalendar, seqSemanaLaboral.user);

        
        });

  
  }

};