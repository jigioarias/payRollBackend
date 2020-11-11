'use strict';

const sequelize = require('../../frameworks_drivers/database/sequelize');
const Incapacidad = require('../../enterprise_business_rules/entities/Incapacidad');

module.exports = class {

  constructor() {
    this.db = sequelize;
    this.model = this.db.model('inability');
  }

  async persist(incapacidadEntity) {
    const { enterprise, document, initDate, endDate, type, user, employeeId, year, registerPeriod, clase, salary, state, percentage } = incapacidadEntity;
    const seqIncapacidad = await this.model.create({ enterprise, document, initDate, endDate, type, user, employeeId, year, registerPeriod, clase, salary, state, percentage });

    await seqIncapacidad.save();

    return new Incapacidad(
      seqIncapacidad.id, seqIncapacidad.enterprise,
      seqIncapacidad.document, seqIncapacidad.initDate,
      seqIncapacidad.endDate, seqIncapacidad.type,
      seqIncapacidad.user,
      seqIncapacidad.employeeId, seqIncapacidad.year,
      seqIncapacidad.registerPeriod, seqIncapacidad.clase,
      seqIncapacidad.salary, seqIncapacidad.state,
      seqIncapacidad.percentage);
  }



  async find(incapacidadEntity) {

    const seqIncapacidads = await this.model.findAll(
      {

        where: {
          enterprise: incapacidadEntity.enterprise,
          year: incapacidadEntity.year,
          clase: incapacidadEntity.clase,
          employeeId: incapacidadEntity.employeeId,
          state: incapacidadEntity.state
        }
      }

    );

    if (!seqIncapacidads) return null;


    return seqIncapacidads.map((seqIncapacidad) => {

      return new Incapacidad(
        seqIncapacidad.id, seqIncapacidad.enterprise,
        seqIncapacidad.document, seqIncapacidad.initDate,
        seqIncapacidad.endDate, seqIncapacidad.type, seqIncapacidad.user,
        seqIncapacidad.employeeId, seqIncapacidad.year,
        seqIncapacidad.registerPeriod, seqIncapacidad.clase,
        seqIncapacidad.salary, seqIncapacidad.state,
        seqIncapacidad.percentage);
    });



  }

  async list(incapacidadEntity) {

    const seqIncapacidads = await this.model.findAll({
      where: {
        enterprise:incapacidadEntity.enterprise,
        state: incapacidadEntity.state,
        registerPeriod: incapacidadEntity.registerPeriod,
        clase: incapacidadEntity.clase
      }
    });

    return seqIncapacidads.map((seqIncapacidad) => {

      return new Incapacidad(
        seqIncapacidad.id, seqIncapacidad.enterprise,
        seqIncapacidad.document, seqIncapacidad.initDate,
        seqIncapacidad.endDate, seqIncapacidad.type,
        seqIncapacidad.user,
        seqIncapacidad.employeeId, seqIncapacidad.year,
        seqIncapacidad.registerPeriod, seqIncapacidad.clase,
        seqIncapacidad.salary, seqIncapacidad.state,
        seqIncapacidad.percentage);

    });

  }

  async listByClassPayRoll(incapacidadEntity) {

    const seqIncapacidads = await this.model.findAll({
      where: {
        enterprise: incapacidadEntity.enterprise,
        state: incapacidadEntity.state,
        clase: incapacidadEntity.clase
      }
    });

    return seqIncapacidads.map((seqIncapacidad) => {

      return new Incapacidad(
        seqIncapacidad.id, seqIncapacidad.enterprise,
        seqIncapacidad.document, seqIncapacidad.initDate,
        seqIncapacidad.endDate, seqIncapacidad.type,
        seqIncapacidad.user,
        seqIncapacidad.employeeId, seqIncapacidad.year,
        seqIncapacidad.registerPeriod, seqIncapacidad.clase,
        seqIncapacidad.salary, seqIncapacidad.state,
        seqIncapacidad.percentage);

    });


  }
  async listByEnterprise(incapacidadEntity) {

    const seqIncapacidads = await this.model.findAll({
      where: {
        enterprise:incapacidadEntity.enterprise,
        state: incapacidadEntity.state
      }
    });

    return seqIncapacidads.map((seqIncapacidad) => {

      return new Incapacidad(
        seqIncapacidad.id, seqIncapacidad.enterprise,
        seqIncapacidad.document, seqIncapacidad.initDate,
        seqIncapacidad.endDate, seqIncapacidad.type,
        seqIncapacidad.user,
        seqIncapacidad.employeeId, seqIncapacidad.year,
        seqIncapacidad.registerPeriod, seqIncapacidad.clase,
        seqIncapacidad.salary, seqIncapacidad.state,
        seqIncapacidad.percentage);

    });

  }
  async findByDocument(incapacidadEntity) {

    const seqIncapacidads = await this.model.findAll(
      {

        where: {
          enterprise: incapacidadEntity.enterprise,
          document: incapacidadEntity.document,
        }
      }

    );

    if (!seqIncapacidads) return null;


    return seqIncapacidads.map((seqIncapacidad) => {

      return new Incapacidad(
        seqIncapacidad.id, seqIncapacidad.enterprise,
        seqIncapacidad.document, seqIncapacidad.initDate,
        seqIncapacidad.endDate, seqIncapacidad.type,
        seqIncapacidad.user,
        seqIncapacidad.employeeId, seqIncapacidad.year,
        seqIncapacidad.registerPeriod, seqIncapacidad.clase,
        seqIncapacidad.salary, seqIncapacidad.state,
        seqIncapacidad.percentage);

    });



  }

  async merge(incapacidadEntity) {


    const { enterprise, document, initDate, endDate, type, user, employeeId, year, registerPeriod, clase, salary, state, percentage } = incapacidadEntity;
    let seqIncapacidad = await this.model.findOne({ where: { id: incapacidadEntity.id } });

    if (!seqIncapacidad) return false;


    await seqIncapacidad.update({ enterprise, document, initDate, endDate, type, user, employeeId, year, registerPeriod, clase, salary, state, percentage });


    return new Incapacidad(
      seqIncapacidad.id, seqIncapacidad.enterprise,
      seqIncapacidad.document, seqIncapacidad.initDate,
      seqIncapacidad.endDate, seqIncapacidad.type,
      seqIncapacidad.user,
      seqIncapacidad.employeeId, seqIncapacidad.year,
      seqIncapacidad.registerPeriod, seqIncapacidad.clase,
      seqIncapacidad.salary, seqIncapacidad.state,
      seqIncapacidad.percentage);
  }


};