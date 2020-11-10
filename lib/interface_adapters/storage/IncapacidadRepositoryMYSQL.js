'use strict';

const sequelize = require('../../frameworks_drivers/database/sequelize');
const Incapacidad = require('../../enterprise_business_rules/entities/Incapacidad');

module.exports = class {

  constructor() {
    this.db = sequelize;
    this.model = this.db.model('inability');
  }

  async persist(incapacidadEntity) {
    const {  enterprise, document, initDate, endDate,  type ,user,employeeId,year, registerPeriod,clase,salary,active,percentage } = incapacidadEntity;
    console.log(incapacidadEntity.active);
    const seqIncapacidad = await this.model.create({  enterprise, document, initDate, endDate,  type ,user,employeeId, year, registerPeriod,clase,salary,active,percentage });

     await seqIncapacidad.save();
    
    return new Incapacidad(
      seqIncapacidad.id,  seqIncapacidad.enterprise, 
      seqIncapacidad.document, seqIncapacidad.initDate, 
      seqIncapacidad.endDate,seqIncapacidad.type, 
      seqIncapacidad.user,
      seqIncapacidad.employeeId,seqIncapacidad.year,
      seqIncapacidad. registerPeriod,seqIncapacidad.clase,
      seqIncapacidad.salary,seqIncapacidad.active,
      seqIncapacidad.percentage);
  }



  async find(incapacidadEntity) {

     const seqIncapacidads = await this.model.findAll(
      {
             
        where: {enterprise:incapacidadEntity.enterprise,
                 year : incapacidadEntity.year,
                clase :incapacidadEntity.clase ,
                employeeId :incapacidadEntity.employeeId,
                active : incapacidadEntity.active
            }
      }

     );
         
     if(!seqIncapacidads) return null;
  
         
     return    seqIncapacidads.map((seqIncapacidad) => {

      return new Incapacidad(
        seqIncapacidad.id,  seqIncapacidad.enterprise, 
        seqIncapacidad.document, seqIncapacidad.initDate, 
        seqIncapacidad.endDate,seqIncapacidad.type,seqIncapacidad.user,
        seqIncapacidad.employeeId,seqIncapacidad.year,
        seqIncapacidad. registerPeriod,seqIncapacidad.clase,
        seqIncapacidad.salary,seqIncapacidad.active,
        seqIncapacidad.percentage);      
      });



  }

  async list(incapacidadEntity) {

    const seqIncapacidads = await this.model.findAll({ where: { enterprise: 
           incapacidadEntity.enterprise, 
           active : incapacidadEntity.active, 
           registerPeriod:incapacidadEntity.registerPeriod,
           clase : incapacidadEntity.clase
         } });
    
    return seqIncapacidads.map((seqIncapacidad) => {
       
        return new Incapacidad(
            seqIncapacidad.id,  seqIncapacidad.enterprise, 
            seqIncapacidad.document, seqIncapacidad.initDate, 
            seqIncapacidad.endDate,seqIncapacidad.type, 
            seqIncapacidad.user,
            seqIncapacidad.employeeId,seqIncapacidad.year,
            seqIncapacidad. registerPeriod,seqIncapacidad.clase,
            seqIncapacidad.salary,seqIncapacidad.active,
            seqIncapacidad.percentage);   
        
        });
    
  }

 

};