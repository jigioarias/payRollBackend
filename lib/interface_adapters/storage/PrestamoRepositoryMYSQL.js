'use strict';

const sequelize = require('../../frameworks_drivers/database/sequelize');
const Prestamo = require('../../enterprise_business_rules/entities/Prestamo');

module.exports = class {

  constructor() {
    this.db = sequelize;
    this.model = this.db.model('prestamo');
  }

  async persist(prestamoEntity) {
    const {  enterprise,employeeId, document, initDate,valor, balance,aproveDate,year,aprovePeriod,clase,interests,state,observation,user,concept } = prestamoEntity;
   
    const seqPrestamo = await this.model.create({  enterprise,employeeId, document, initDate,valor, balance
        ,aproveDate,year,aprovePeriod,clase,interests,state,observation,user ,concept});

     await seqPrestamo.save();
    
    return new Prestamo(
      seqPrestamo.id,  seqPrestamo.enterprise, 
      seqPrestamo.employeeId,
      seqPrestamo.document, 
      seqPrestamo.initDate, 
      seqPrestamo.valor, 
      seqPrestamo.balance,
      seqPrestamo.aproveDate,
      seqPrestamo.year,
      seqPrestamo. aprovePeriod,
      seqPrestamo.clase,
      seqPrestamo.interests,
      seqPrestamo.state,
      seqPrestamo.observation,
      seqPrestamo.user,
      seqPrestamo.concept);
  }


  
  async merge(prestamoEntity) {
  
    const seqPrestamo = await this.model.findByPk(prestamoEntity.id);


    if (!seqPrestamo) return false;

    const {  enterprise,employeeId, document, initDate,valor, balance,aproveDate,year,aprovePeriod,clase,interests,state,observation,user,concept } = prestamoEntity;
    await seqPrestamo.update({  enterprise,employeeId, document, initDate,valor, balance
      ,aproveDate,year,aprovePeriod,clase,interests,state,observation,user ,concept});

      return new Prestamo(
        seqPrestamo.id,  seqPrestamo.enterprise, 
        seqPrestamo.employeeId,
        seqPrestamo.document, 
        seqPrestamo.initDate, 
        seqPrestamo.valor, 
        seqPrestamo.balance,
        seqPrestamo.aproveDate,
        seqPrestamo.year,
        seqPrestamo. aprovePeriod,
        seqPrestamo.clase,
        seqPrestamo.interests,
        seqPrestamo.state,
        seqPrestamo.observation,
        seqPrestamo.user,
        seqPrestamo.concept);

    }

  async find(enterprise, employeeId, year, clase,state) {

     const seqPrestamos = await this.model.findAll(
      {
             
        where: {enterprise:enterprise,
                 year : year,
                clase :clase ,
                employeeId :employeeId,
                state : state
            }
      }

     );
         
     if(!seqPrestamos) return null;
  
         
     return    seqPrestamos.map((seqPrestamo) => {

      return  new Prestamo(
        seqPrestamo.id,  seqPrestamo.enterprise, 
        seqPrestamo.employeeId,
        seqPrestamo.document, 
        seqPrestamo.initDate, 
        seqPrestamo.valor, 
        seqPrestamo.balance,
        seqPrestamo.aproveDate,
        seqPrestamo.year,
        seqPrestamo. aprovePeriod,
        seqPrestamo.clase,
        seqPrestamo.interests,
        seqPrestamo.state,
        seqPrestamo.observation,
        seqPrestamo.user,
        seqPrestamo.concept);     
      });

  }
 

};