'use strict';

const sequelize = require('../../frameworks_drivers/database/sequelize');
const CentroCostos = require('../../enterprise_business_rules/entities/CentroCostos');



module.exports = class {

  constructor() {
    this.db = sequelize;
    this.model = this.db.model('centrocosto');
  }

  async persist(centroCostosEntity) {
    const {  enterprise, code, description,active,user,branchOffice } = centroCostosEntity;
 
    const seqCentroCostos = await this.model.create({  enterprise, code, description,active,user,branchOffice});
    await seqCentroCostos.save();

    return new CentroCostos(seqCentroCostos.id,  seqCentroCostos.enterprise, seqCentroCostos.code, seqCentroCostos.description,seqCentroCostos.active,seqCentroCostos.user,seqCentroCostos.branchOffice);
  }



  async merge(centroCostosEntity) {
    const seqCentroCostos = await this.model.findByPk(centroCostosEntity.id);

    if (!seqCentroCostos) return false;

    const { enterprise, code, description,active,user,branchOffice } = centroCostosEntity;
    await seqCentroCostos.update({ enterprise, code,  description,active,user,branchOffice });

    return new CentroCostos(seqCentroCostos.id,  seqCentroCostos.enterprise, seqCentroCostos.code, seqCentroCostos.description,seqCentroCostos.active,seqCentroCostos.user,seqCentroCostos.branchOffice);
  }

  async remove(centroCostosId) {
    const seqCentroCostos = await this.model.findByPk(centroCostosId);
    if (seqCentroCostos) {
      return seqCentroCostos.destroy();
    }
    return false;
  }

  async get(centroCostosId) {
    const seqCentroCostos = await this.model.findByPk(centroCostosId);
    return new CentroCostos(seqCentroCostos.id,  seqCentroCostos.enterprise, seqCentroCostos.code, seqCentroCostos.description,seqCentroCostos.active,seqCentroCostos.user,seqCentroCostos.branchOffice);
  }

  async getByDescription(description) {
    
    const seqCentroCostos = await this.model.findOne({ where: { description: description } });
    return new CentroCostos(seqCentroCostos.id,  seqCentroCostos.enterprise, seqCentroCostos.code, seqCentroCostos.description,seqCentroCostos.active,seqCentroCostos.user,seqCentroCostos.branchOffice);
  }

  async find() {
    const seqCentroCostoss = await this.model.findAll();
    return seqCentroCostoss.map((seqCentroCostos) => {
        return new CentroCostos(seqCentroCostos.id,  seqCentroCostos.enterprise, seqCentroCostos.code, seqCentroCostos.description,seqCentroCostos.active,seqCentroCostos.user,seqCentroCostos.branchOffice);
    });
  }

};