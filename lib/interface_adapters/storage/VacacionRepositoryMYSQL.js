'use strict';

const sequelize = require('../../frameworks_drivers/database/sequelize');
const Vacacion = require('../../enterprise_business_rules/entities/Vacacion');

module.exports = class {

  constructor() {
    this.db = sequelize;
    this.model = this.db.model('vacacion');
  }

  async persist(vacacionEntity) {
    const {  enterprise, document, enjoyInitDate, enjoyEndDate,  moneyDays ,remuneration,user,employeeId,year, registerPeriod,clase,enjoyDays,salary,active } = vacacionEntity;
    console.log(vacacionEntity.active);
    const seqVacacion = await this.model.create({  enterprise, document, enjoyInitDate, enjoyEndDate,  moneyDays ,remuneration,user,employeeId, year, registerPeriod,clase,enjoyDays,salary,active });

     await seqVacacion.save();
    
    return new Vacacion(
      seqVacacion.id,  seqVacacion.enterprise, 
      seqVacacion.document, seqVacacion.enjoyInitDate, 
      seqVacacion.enjoyEndDate,seqVacacion.moneyDays, 
      seqVacacion.remuneration,seqVacacion.user,
      seqVacacion.employeeId,seqVacacion.year,
      seqVacacion. registerPeriod,seqVacacion.clase,
      seqVacacion.enjoyDays,seqVacacion.salary,seqVacacion.active);
  }



  async find(enterprise, employeeId, year, clase,active) {

     const seqVacacions = await this.model.findAll(
      {
             
        where: {enterprise:enterprise,
                 year : year,
                clase :clase ,
                employeeId :employeeId,
                active : active
            }
      }

     );
         
     if(!seqVacacions) return null;
  
         
     return    seqVacacions.map((seqVacacion) => {

      return new Vacacion(
        seqVacacion.id,  seqVacacion.enterprise, 
        seqVacacion.document, seqVacacion.enjoyInitDate, 
        seqVacacion.enjoyEndDate,seqVacacion.moneyDays, 
        seqVacacion.remuneration,seqVacacion.user,
        seqVacacion.employeeId,seqVacacion.year,
        seqVacacion. registerPeriod,seqVacacion.clase,
        seqVacacion.enjoyDays,seqVacacion.salary,seqVacacion.active);      
      });



  }

  
 

};