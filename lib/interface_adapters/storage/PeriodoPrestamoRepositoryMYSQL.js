'use strict';

const sequelize = require('../../frameworks_drivers/database/sequelize');
const PeriodoPrestamo = require('../../enterprise_business_rules/entities/PeriodoPrestamo');

module.exports = class {

  constructor() {
    this.db = sequelize;
    this.model = this.db.model('periodPrestamo');
  }

  async persist(periodoPrestamoEntity) {
    const {  enterprise,employeeId, document, idLoan,fee, interests,period,type,state,userr } = periodoPrestamoEntity;
    console.log(periodoPrestamoEntity.active);
    const seqPeriodoPrestamo = await this.model.create({  enterprise,employeeId, document, idLoan,fee, interests,period,type,state,user });

     await seqPeriodoPrestamo.save();
    
    return new PeriodoPrestamo(
      seqPeriodoPrestamo.id,  
      seqPeriodoPrestamo.enterprise, 
      seqPeriodoPrestamo.employeeId,
      seqPeriodoPrestamo.document, 
      seqPeriodoPrestamo.idLoan, 
      seqPeriodoPrestamo.fee, 
      seqPeriodoPrestamo.interests,
      seqPeriodoPrestamo.period,
      seqPeriodoPrestamo.type,
      seqPeriodoPrestamo.state,
      seqPeriodoPrestamo.user);
  }



  async find(enterprise, employeeId,state,period) {

     const seqPeriodoPrestamos = await this.model.findAll(
      {
             
        where: {enterprise:enterprise,
                employeeId :employeeId,
                state : state,
                period :period
            }
      }

     );
         
     if(!seqPeriodoPrestamos) return null;
  
         
     return    seqPeriodoPrestamos.map((seqPeriodoPrestamo) => {

      return new PeriodoPrestamo(
        seqPeriodoPrestamo.id,  
        seqPeriodoPrestamo.enterprise, 
        seqPeriodoPrestamo.employeeId,
        seqPeriodoPrestamo.document, 
        seqPeriodoPrestamo.idLoan, 
        seqPeriodoPrestamo.fee, 
        seqPeriodoPrestamo.interests,
        seqPeriodoPrestamo.period,
        seqPeriodoPrestamo.type,
        seqPeriodoPrestamo.state,
        seqPeriodoPrestamo.user);   
      });

  }
 

};