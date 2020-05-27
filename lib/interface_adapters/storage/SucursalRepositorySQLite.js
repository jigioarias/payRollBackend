'use strict';

const sequelize = require('../../frameworks_drivers/database/sequelize');
const Sucursal = require('../../enterprise_business_rules/entities/Sucursal');

module.exports = class {

  constructor() {
    this.db = sequelize;
    this.model = this.db.model('sucursal');
  }

  async persist(sucursalEnttiy) {
    const {  enterprise, code, address, description,phone,active,user } = sucursalEnttiy;
    const seqSucursal = await this.model.create({  enterprise, code, address, description,phone,active,user });
    await seqSucursal.save();

    return new Sucursal(seqSucursal.id,  seqSucursal.enterprise, seqSucursal.code, seqSucursal.address, seqSucursal.description,seqSucursal.phone,seqSucursal.active,seqSucursal.user);
  }

  async merge(sucursalEnttiy) {
    const seqSucursal = await this.model.findByPk(sucursalEnttiy.id);

    if (!seqSucursal) return false;

    const { enterprise, code, unity, description,active,user } = sucursalEnttiy;
    await seqSucursal.update({ enterprise, code, unity, description,active,user });

    return new Sucursal(seqSucursal.id,  seqSucursal.enterprise, seqSucursal.code, seqSucursal.address, seqSucursal.description,seqSucursal.phone,seqSucursal.active,seqSucursal.user);
  }

  async remove(SucursalId) {
    const seqSucursal = await this.model.findByPk(SucursalId);
    if (seqSucursal) {
      return seqSucursal.destroy();
    }
    return false;
  }

  async get(SucursalId) {
    const seqSucursal = await this.model.findByPk(SucursalId);
    return new Sucursal(seqSucursal.id,  seqSucursal.enterprise, seqSucursal.code, seqSucursal.address, seqSucursal.description,seqSucursal.phone,seqSucursal.active,seqSucursal.user);
  }

  async getByDescription(description) {
    console.log('consultandoi por email',description);
    const seqSucursal = await this.model.findOne({ where: { description: description } });
    return new Sucursal(seqSucursal.id,  seqSucursal.enterprise, seqSucursal.code, seqSucursal.address, seqSucursal.description,seqSucursal.phone,seqSucursal.active,seqSucursal.user);
  }

  async find() {
    const seqSucursals = await this.model.findAll();
    return seqSucursals.map((seqSucursal) => {
        return new Sucursal(seqSucursal.id,  seqSucursal.enterprise, seqSucursal.code, seqSucursal.address, seqSucursal.description,seqSucursal.phone,seqSucursal.active,seqSucursal.user);
//        return new Sucursal(seqSucursal.id,  seqSucursal.enterprise, seqSucursal.code, seqSucursal.unity, seqSucursal.description,seqSucursal.active,seqSucursal.user);
    });
  }

};