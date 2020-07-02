'use strict';

const sequelize = require('../../frameworks_drivers/database/sequelize');
const CalendarioLaboral = require('../../enterprise_business_rules/entities/CalendarioLaboral');
const FechaCalendarioLaboral = require('../../enterprise_business_rules/entities/FechaCalendarioLaboral');

module.exports = class {

  constructor() {
    this.db = sequelize;
    this.model = this.db.model('calendariolaboral');
    this.modelFechas =this.db.model('fechascalendariolaboral');
    
  }

  async persist(calendarioLaboralEntity) {
    const {  enterprise,  description, year,user} = calendarioLaboralEntity;
    const seqCalendarioLaboral = await this.model.create({  enterprise,  description, year,user });
   
    await seqCalendarioLaboral.save();
    
    return new CalendarioLaboral(seqCalendarioLaboral.id,  seqCalendarioLaboral.enterprise,  seqCalendarioLaboral.description, seqCalendarioLaboral.year,seqCalendarioLaboral.user);
  }

  async merge(calendarioLaboralEntity) {
    const seqCalendarioLaboral = await this.model.findByPk(calendarioLaboralEntity.id);

    if (!seqCalendarioLaboral) return false;

    const {  enterprise,  description, year,user} = calendarioLaboralEntity;
    await seqCalendarioLaboral.update({ enterprise,  description, workcalenar,user });

    return new CalendarioLaboral(seqCalendarioLaboral.id,  seqCalendarioLaboral.enterprise,  seqCalendarioLaboral.description, seqCalendarioLaboral.year, seqCalendarioLaboral.user);

    }

  async remove(calendarioLaboralId) {
    const seqCalendarioLaboral = await this.model.findByPk(calendarioLaboralId);
    if (seqCalendarioLaboral) {
      return seqCalendarioLaboral.destroy();
    }
    return false;
  }

  async get(calendarioLaboralId) {

    const seqCalendarioLaboral = await this.model.findOne({
        
      where :{
         id:calendarioLaboralId
      },
      include: {
        model: this.modelFechas
            
      }
    });
  

      return new CalendarioLaboral(seqCalendarioLaboral.id,  seqCalendarioLaboral.enterprise,  seqCalendarioLaboral.description, seqCalendarioLaboral.user,seqCalendarioLaboral.fechascalendariolaborals);


}

  async getDatesByDate(calendarioLaboralEntity,fechaInicial,fechaFinal) {


    
    const { Op } = require("sequelize");

    console.log(fechaInicial);
    
    const seqCalendarios = await this.modelFechas.findAll({
        where: {enterprise :
                calendarioLaboralEntity.enterprise,
                 calendariolaboralId : calendarioLaboralEntity.id,
                 date: {
                  [Op.gte]:fechaInicial,
                  [Op.lte]:fechaFinal
                  
                }
              },
      
      });

      return    seqCalendarios.map((seqCalendarioLaboral) => {
      return new FechaCalendarioLaboral(seqCalendarioLaboral.id,  seqCalendarioLaboral.enterprise,  seqCalendarioLaboral.date, seqCalendarioLaboral.year, seqCalendarioLaboral.user,seqCalendarioLaboral.type);
       });
}

  async find(enterprise) {

 
    const seqCalenadarios = await this.model.findAll({
        where: {enterprise:enterprise},
        include: [{
            model: Models.Fechas,
            where: {}
        }]
      });
      
       
      return    seqCalenadarios.map((seqCalendarioLaboral) => {
        return new CalendarioLaboral(seqCalendarioLaboral.id,  seqCalendarioLaboral.enterprise,  seqCalendarioLaboral.description, seqCalendarioLaboral.year, seqCalendarioLaboral.user,seqCalendarioLaboral.dates);

        
        });

  
  }

};