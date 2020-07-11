'use strict';

const sequelize = require('../../frameworks_drivers/database/sequelize');
const Vacacion = require('../../enterprise_business_rules/entities/Vacacion');

module.exports = class {

  constructor() {
    this.db = sequelize;
    this.model = this.db.model('vacacion');
  }

  async persist(vacacionEntity) {
    const {  enterprise, document, enjoyInitDate, enjoyEndDate,  moneyDays ,remuneration,user,employeeId,year, registerPeriod,clase,enjoyDays,salary } = vacacionEntity;
    
    const seqVacacion = await this.model.create({  enterprise, document, enjoyInitDate, enjoyEndDate,  moneyDays ,remuneration,user,employeeId, year, registerPeriod,clase,enjoyDays,salary });

     await seqVacacion.save();
    
    return new Vacacion(
      seqVacacion.id,  seqVacacion.enterprise, 
      seqVacacion.document, seqVacacion.enjoyInitDate, 
      seqVacacion.enjoyEndDate,seqVacacion.moneyDays, 
      seqVacacion.remuneration,seqVacacion.user,
      seqVacacion.employeeId,seqVacacion.year,
      seqVacacion. registerPeriod,seqVacacion.clase,
      seqVacacion.enjoyDays,seqVacacion.salary);
  }



  async find(enterprise,document, year, clase,init) {

     const seqVacacion = await this.model.findOne(
      {
             
        where: {enterprise:enterprise,
                document : document,
                year : year
            }
      }

     );
         

     return new Vacacion(
        seqVacacion.id,  seqVacacion.enterprise, 
        seqVacacion.document, seqVacacion.enjoyInitDate, 
        seqVacacion.enjoyEndDate,seqVacacion.moneyDays, 
        seqVacacion.remuneration,seqVacacion.user,
        seqVacacion.employeeId,seqVacacion.year,
        seqVacacion. registerPeriod,seqVacacion.clase,
        seqVacacion.enjoyDays,seqVacacion.salary);
  }

  
 

};