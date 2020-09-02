'use strict';

const sequelize = require('../../frameworks_drivers/database/sequelize');
const Licencia = require('../../enterprise_business_rules/entities/Licencia');

module.exports = class {

  constructor() {
    this.db = sequelize;
    this.model = this.db.model('leave');
  }

  async persist(licenciaEntity) {
    const {  enterprise, document, initDate, endDate,  type ,remuneration,user,employeeId,year, registerPeriod,clase,salary,active,hours } = licenciaEntity;
    console.log(licenciaEntity.active);
    const seqLicencia = await this.model.create({  enterprise, document, initDate, endDate,  type ,remuneration,user,employeeId, year, registerPeriod,clase,salary,active,hours });

     await seqLicencia.save();
    
    return new Licencia(
      seqLicencia.id,  seqLicencia.enterprise, 
      seqLicencia.document, seqLicencia.initDate, 
      seqLicencia.endDate,seqLicencia.type, 
      seqLicencia.remuneration,seqLicencia.user,
      seqLicencia.employeeId,seqLicencia.year,
      seqLicencia. registerPeriod,seqLicencia.clase,
      seqLicencia.salary,seqLicencia.active,seqLicencia.hours
      );
  }



  async find(licenciaEntity) {

     const seqLicencias = await this.model.findAll(
      {
             
        where: {enterprise:licenciaEntity.enterprise,
                 year : licenciaEntity.year,
                clase :licenciaEntity.clase ,
                employeeId :licenciaEntity.employeeId,
                active : licenciaEntity.active
            }
      }

     );
         
     if(!seqLicencias) return null;
  
         
     return    seqLicencias.map((seqLicencia) => {

      return new Licencia(
        seqLicencia.id,  seqLicencia.enterprise, 
        seqLicencia.document, seqLicencia.initDate, 
        seqLicencia.endDate,seqLicencia.type, 
        seqLicencia.remuneration,seqLicencia.user,
        seqLicencia.employeeId,seqLicencia.year,
        seqLicencia. registerPeriod,seqLicencia.clase,
        seqLicencia.salary,seqLicencia.active,seqLicencia.hours);      
      });



  }

  async list(licenciaEntity) {

    console.log('licenciaEntity:::::',licenciaEntity);
    const seqLicencias = await this.model.findAll({ where: { enterprise: 
           licenciaEntity.enterprise, 
           active : licenciaEntity.active, 
           registerPeriod:licenciaEntity.registerPeriod,
           clase : licenciaEntity.clase
         } });
    
    return seqLicencias.map((seqLicencia) => {
       
        return new Licencia(
            seqLicencia.id,  seqLicencia.enterprise, 
            seqLicencia.document, seqLicencia.initDate, 
            seqLicencia.endDate,seqLicencia.type, 
            seqLicencia.remuneration,seqLicencia.user,
            seqLicencia.employeeId,seqLicencia.year,
            seqLicencia. registerPeriod,seqLicencia.clase,
            seqLicencia.salary,seqLicencia.active,seqLicencia.hours);   
        
        });
    
  }

 

};