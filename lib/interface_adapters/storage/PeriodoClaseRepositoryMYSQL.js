'use strict';

const sequelize = require('../../frameworks_drivers/database/sequelize');
const PeriodoClase = require('../../enterprise_business_rules/entities/PeriodoClase');

module.exports = class {

  constructor() {
    this.db = sequelize;
    this.model = this.db.model('periodosclase');
  }

  async persist(periodclassEntity) {
  
  
    const { enterprise, clase, period, year, active,user } = periodclassEntity;
    const seqPeriodo = await this.model.create({ enterprise, clase, period,year, active,user });
    await seqPeriodo.save();

    return new PeriodoClase(seqPeriodo.id, seqPeriodo.enterprise, seqPeriodo.clase, seqPeriodo.period,seqPeriodo.year, seqPeriodo.active,seqPeriodo.user);
  }

  async merge(periodclassEntity) {
    const seqPeriodo = await this.model.findByPk(periodclassEntity.id);

    if (!seqPeriodo) return false;

    const { enterprise, clase, period,year, active,user } = periodclassEntity;
    await seqPeriodo.update({ enterprise, clase, period,year, active,user });

    return new PeriodoClase(seqPeriodo.id, seqPeriodo.enterprise, seqPeriodo.clase, seqPeriodo.period,seqPeriodo.year, seqPeriodo.active,seqPeriodo.user);
  }

  async remove(PeriodoClaseId) {
    const seqPeriodo = await this.model.findByPk(PeriodoClaseId);
    if (seqPeriodo) {
      return seqPeriodo.destroy();
    }
    return false;
  }

  async get(PeriodoClaseId) {
    const seqPeriodo = await this.model.findByPk(PeriodoClaseId);
    return new PeriodoClase(seqPeriodo.id, seqPeriodo.enterprise, seqPeriodo.clase, seqPeriodo.period,seqPeriodo.year, seqPeriodo.active,seqPeriodo.user);
  }

 
  async find() {
    const seqPeriodos = await this.model.findAll();
    return seqPeriodos.map((seqPeriodo) => {
        return new PeriodoClase(seqPeriodo.id, seqPeriodo.enterprise, seqPeriodo.clase, seqPeriodo.period,seqPeriodo.year, seqPeriodo.active,seqPeriodo.user);
    });
  }

  async findByClassPayRoll(enterprise,clase,active) {
    const seqPeriodos = await this.model.findAll({
      where: { enterprise:enterprise,clase:clase ,active:active } }
    );
    return seqPeriodos.map((seqPeriodo) => {
        return new PeriodoClase(seqPeriodo.id, seqPeriodo.enterprise, seqPeriodo.clase, seqPeriodo.period,seqPeriodo.year, seqPeriodo.active,seqPeriodo.user);
    });
  }

};