'use strict';

const sequelize = require('../../frameworks_drivers/database/sequelize');
const Area = require('../../enterprise_business_rules/entities/Area');

module.exports = class {

  constructor() {
    this.db = sequelize;
    this.model = this.db.model('area');
  }

  async persist(areaEntity) {
    const {  enterprise, code, unity, description,active,user } = areaEntity;
    const seqArea = await this.model.create({  enterprise, code, unity, description,active,user });
    await seqArea.save();

    return new Area(seqArea.id,  seqArea.enterprise, seqArea.code, seqArea.unity, seqArea.description,seqArea.active,seqArea.user);
  }

  async merge(areaEntity) {
    const seqArea = await this.model.findByPk(areaEntity.id);

    if (!seqArea) return false;

    const { enterprise, code, unity, description,active,user } = areaEntity;
    await seqArea.update({ enterprise, code, unity, description,active,user });

    return new Area(seqArea.id,  seqArea.enterprise, seqArea.code, seqArea.unity, seqArea.description,seqArea.active,seqArea.user);
  }

  async remove(areaId) {
    const seqArea = await this.model.findByPk(areaId);
    if (seqArea) {
      return seqArea.destroy();
    }
    return false;
  }

  async get(areaId) {
    const seqArea = await this.model.findByPk(areaId);
    return new Area(seqArea.id,  seqArea.enterprise, seqArea.code, seqArea.unity, seqArea.description,seqArea.active,seqArea.user);
  }

  async getByDescription(description) {
    console.log('consultandoi por email',description);
    const seqArea = await this.model.findOne({ where: { description: description } });
    return new Area(seqArea.id,  seqArea.enterprise, seqArea.code, seqArea.unity, seqArea.description,seqArea.active,seqArea.user);
  }

  async find() {
    const seqAreas = await this.model.findAll();
    return seqAreas.map((seqArea) => {
        return new Area(seqArea.id,  seqArea.enterprise, seqArea.code, seqArea.unity, seqArea.description,seqArea.active,seqArea.user);
    });
  }

};