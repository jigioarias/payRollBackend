'use strict';

const sequelize = require('../../frameworks_drivers/database/sequelize');
const ConceptoNomina = require('../../enterprise_business_rules/entities/ConceptosNomina');

module.exports = class {

  constructor() {
    this.db = sequelize;
    this.model = this.db.model('conceptonomina');
  }

  async persist(conceptoNominaEntity) {
    const {  enterprise, clase, concept, active,user } = conceptoNominaEntity;

    const seqconceptoNomina = await this.model.create({  enterprise, clase, concept, active,user });

  
    await seqconceptoNomina.save();
    
    return new ConceptoNomina(seqconceptoNomina.id,  seqconceptoNomina.enterprise, seqconceptoNomina.clase, seqconceptoNomina.concept, seqconceptoNomina.active, seqconceptoNomina.user);
  }

  async merge(conceptoNominaEntity) {
    const seqconceptoNomina = await this.model.findByPk(conceptoNominaEntity.id);

    if (!seqconceptoNomina) return false;

    const { enterprise, code, unity, description,active,user } = conceptoNominaEntity;
    await seqconceptoNomina.update({ enterprise, code, unity, description,active,user });

    return new ConceptoNomina(seqconceptoNomina.id,  seqconceptoNomina.enterprise, seqconceptoNomina.clase, seqconceptoNomina.concept, seqconceptoNomina.active, seqconceptoNomina.user);

    }

  async remove(conceptoNominaId) {
    const seqconceptoNomina = await this.model.findByPk(conceptoNominaId);
    if (seqconceptoNomina) {
      return seqconceptoNomina.destroy();
    }
    return false;
  }

  async get(conceptoNominaId) {
    const seqconceptoNomina = await this.model.findByPk(conceptoNominaId);

    return new ConceptoNomina(seqconceptoNomina.id,  seqconceptoNomina.enterprise, seqconceptoNomina.clase, seqconceptoNomina.concept, seqconceptoNomina.active, seqconceptoNomina.user);

}


  async find(enterprise,active) {

     const seqconceptoNominas = await this.model.findAll({
      where: { enterprise: enterprise,active:active } }

     );
    
      return seqconceptoNominas.map((seqconceptoNomina) => {
        return new ConceptoNomina(seqconceptoNomina.id,  seqconceptoNomina.enterprise, seqconceptoNomina.clase, seqconceptoNomina.concept, seqconceptoNomina.active, seqconceptoNomina.user);
       
        });

  }

  async findByClassPayRoll(enterprise,clase,active) {

    const seqconceptoNominas = await this.model.findAll({
     where: { enterprise: enterprise,clase:clase,active:active } }

    );
   
     return seqconceptoNominas.map((seqconceptoNomina) => {
       return new ConceptoNomina(seqconceptoNomina.id,  seqconceptoNomina.enterprise, seqconceptoNomina.clase, seqconceptoNomina.concept, seqconceptoNomina.active, seqconceptoNomina.user);
      
       });

 }

};