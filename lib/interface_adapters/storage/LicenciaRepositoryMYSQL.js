'use strict';

const sequelize = require('../../frameworks_drivers/database/sequelize');
const Licencia = require('../../enterprise_business_rules/entities/Licencia');

module.exports = class {

  constructor() {
    this.db = sequelize;
    this.model = this.db.model('leave');
  }

  async persist(licenciaEntity) {
    const {  enterprise, document, initDate, endDate,  type ,remuneration,user,employeeId,year, registerPeriod,clase,salary,state,hours } = licenciaEntity;
    console.log(licenciaEntity.state);
    const seqLicencia = await this.model.create({  enterprise, document, initDate, endDate,  type ,remuneration,user,employeeId, year, registerPeriod,clase,salary,state,hours });

     await seqLicencia.save();
    
    return new Licencia(
      seqLicencia.id,  seqLicencia.enterprise, 
      seqLicencia.document, seqLicencia.initDate, 
      seqLicencia.endDate,seqLicencia.type, 
      seqLicencia.remuneration,seqLicencia.user,
      seqLicencia.employeeId,seqLicencia.year,
      seqLicencia. registerPeriod,seqLicencia.clase,
      seqLicencia.salary,seqLicencia.state,seqLicencia.hours
      );
  }



  async find(licenciaEntity) {

     const seqLicencias = await this.model.findAll(
      {
             
        where: {
                enterprise:licenciaEntity.enterprise,
                year : licenciaEntity.year,
                clase :licenciaEntity.clase ,
                employeeId :licenciaEntity.employeeId,
                state : licenciaEntity.state
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
        seqLicencia.salary,seqLicencia.state,seqLicencia.hours);      
      });



  }

  async list(licenciaEntity) {

    const seqLicencias = await this.model.findAll({ where: { enterprise: 
           licenciaEntity.enterprise, 
           state : licenciaEntity.state, 
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
            seqLicencia.salary,seqLicencia.state,seqLicencia.hours);   
        
        });
    
  }

  async listByClassPayRoll(licenciaEntity) {

    const seqLicencias = await this.model.findAll({ where: { enterprise: 
           licenciaEntity.enterprise, 
           state : licenciaEntity.state, 
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
            seqLicencia.salary,seqLicencia.state,seqLicencia.hours);   
        
        });
    
  }
  async listByEnterprise(licenciaEntity) {

    const seqLicencias = await this.model.findAll({ where: { enterprise: 
           licenciaEntity.enterprise, 
           state : licenciaEntity.state
          } });
    
    return seqLicencias.map((seqLicencia) => {
       
        return new Licencia(
            seqLicencia.id,  seqLicencia.enterprise, 
            seqLicencia.document, seqLicencia.initDate, 
            seqLicencia.endDate,seqLicencia.type, 
            seqLicencia.remuneration,seqLicencia.user,
            seqLicencia.employeeId,seqLicencia.year,
            seqLicencia. registerPeriod,seqLicencia.clase,
            seqLicencia.salary,seqLicencia.state,seqLicencia.hours);   
        
        });
    
  }
  async findByDocument(licenciaEntity) {

    const seqLicencias = await this.model.findAll(
     {
            
       where: {
               enterprise:licenciaEntity.enterprise,
               employeeId :licenciaEntity.employeeId,
               state : licenciaEntity.state
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
       seqLicencia.salary,seqLicencia.state,seqLicencia.hours);      
     });



 }

 async merge(licenciaEntity) {

   
  const {  enterprise, document, initDate, endDate,  type ,remuneration,user,employeeId,year, registerPeriod,clase,salary,state,hours } = licenciaEntity;
    let seqLicencia = await this.model.findOne({ where: { id: licenciaEntity.id } });

  if (!seqLicencia) return false;
    

  await seqLicencia.update({ enterprise, document, initDate, endDate,  type ,remuneration,user,employeeId, year, registerPeriod,clase,salary,state,hours});


  return new Licencia(
    seqLicencia.id,  seqLicencia.enterprise, 
    seqLicencia.document, seqLicencia.initDate, 
    seqLicencia.endDate,seqLicencia.type, 
    seqLicencia.remuneration,seqLicencia.user,
    seqLicencia.employeeId,seqLicencia.year,
    seqLicencia. registerPeriod,seqLicencia.clase,
    seqLicencia.salary,seqLicencia.state,seqLicencia.hours);      
}

};