'use strict';

const sequelize = require('../../frameworks_drivers/database/sequelize');
const SolicitudVacacion = require('../../enterprise_business_rules/entities/SolicitudVacacion');

module.exports = class {

  constructor() {
    this.db = sequelize;
    this.model = this.db.model('solicitudvacacion');
  }

  async persist(solicitudVacacionEntity) {
    const {  enterprise, document, enjoyInitDate, enjoyEndDate,  moneyDays  ,state,remuneration,user } = solicitudVacacionEntity;
    
    const seqSolicitudVacacion = await this.model.create({  enterprise, document, enjoyInitDate, enjoyEndDate,  moneyDays  ,state,remuneration,user });

     await seqSolicitudVacacion.save();
    
    return new SolicitudVacacion(seqSolicitudVacacion.id,  seqSolicitudVacacion.enterprise, seqSolicitudVacacion.document, seqSolicitudVacacion.enjoyInitDate, seqSolicitudVacacion.enjoyEndDate,seqSolicitudVacacion.moneyDays,seqSolicitudVacacion.state, 
      seqSolicitudVacacion.remuneration,seqSolicitudVacacion.user);
  }



  async find(enterprise,document, state) {

     const seqSolicitudVacacion = await this.model.findOne(
      {
             
        where: {enterprise:enterprise,
                document : document,
                state : state
            }
      }

     );
         

     return new SolicitudVacacion(seqSolicitudVacacion.id,  seqSolicitudVacacion.enterprise, seqSolicitudVacacion.document, seqSolicitudVacacion.enjoyInitDate, seqSolicitudVacacion.enjoyEndDate,seqSolicitudVacacion.moneyDays,seqSolicitudVacacion.state, 
      seqSolicitudVacacion.remuneration,seqSolicitudVacacion.user);

  }

  
 

};