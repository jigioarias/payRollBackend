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


  async merge(solicitudVacacionEntity) {
    const seqSolicitudVacacion = await this.model.findByPk(solicitudVacacionEntity.id);

    if (!seqSolicitudVacacion) return false;

    const {  enterprise, document, enjoyInitDate, enjoyEndDate,  moneyDays  ,state,remuneration,user } = solicitudVacacionEntity;
    await seqSolicitudVacacion.update({  enterprise, document, enjoyInitDate, enjoyEndDate,  moneyDays  ,state,remuneration,user });

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
     if (!seqSolicitudVacacion) return null;
         

     return new SolicitudVacacion(seqSolicitudVacacion.id,  seqSolicitudVacacion.enterprise, seqSolicitudVacacion.document, seqSolicitudVacacion.enjoyInitDate, seqSolicitudVacacion.enjoyEndDate,seqSolicitudVacacion.moneyDays,seqSolicitudVacacion.state, 
      seqSolicitudVacacion.remuneration,seqSolicitudVacacion.user);

  }

  
  async list(solicitudVacacionEntity) {

    const seqSolicitudVacacions = await this.model.findAll({ where: { enterprise: 
           solicitudVacacionEntity.enterprise, state : solicitudVacacionEntity.state } });
    
    return seqSolicitudVacacions.map((seqSolicitudVacacion) => {
       
        return new SolicitudVacacion(seqSolicitudVacacion.id,  
          seqSolicitudVacacion.enterprise, seqSolicitudVacacion.document, 
          seqSolicitudVacacion.enjoyInitDate, seqSolicitudVacacion.enjoyEndDate,
          seqSolicitudVacacion.moneyDays,seqSolicitudVacacion.state, 
          seqSolicitudVacacion.remuneration,seqSolicitudVacacion.user);
        
        });
    
  }


};