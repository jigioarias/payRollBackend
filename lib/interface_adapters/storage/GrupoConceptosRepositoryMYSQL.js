'use strict';

const sequelize = require('../../frameworks_drivers/database/sequelize');
const GrupoConceptos = require('../../enterprise_business_rules/entities/GrupoConceptos');

module.exports = class {

  constructor() {
    this.db = sequelize;
    this.model = this.db.model('conceptsGroup');
  }

  async persist(grupoConceptosEntity) {
    const {  enterprise, clase,group, concept, active,user } = grupoConceptosEntity;

    const seqGrupoConcepto = await this.model.create({  enterprise, clase,group, concept, active,user });

  
    await seqGrupoConcepto.save();
    
    return new GrupoConceptos(seqGrupoConcepto.id,  seqGrupoConcepto.enterprise, seqGrupoConcepto.clase, seqGrupoConcepto.group ,seqGrupoConcepto.concept, seqGrupoConcepto.active, seqGrupoConcepto.user);
  }

  

  async findByGroup(grupoConceptosEntity) {

    const seqGrupoConceptos = await this.model.findAll({
     where: { enterprise: grupoConceptosEntity.enterprise,clase:grupoConceptosEntity.clase,
        active:grupoConceptosEntity.active,group:grupoConceptosEntity.group } }

    );
   
     return seqGrupoConceptos.map((seqGrupoConcepto) => {
       return new GrupoConceptos(seqGrupoConcepto.id,  seqGrupoConcepto.enterprise, seqGrupoConcepto.clase,seqGrupoConcepto.group, seqGrupoConcepto.concept, seqGrupoConcepto.active, seqGrupoConcepto.user);
      
       });

 }

};