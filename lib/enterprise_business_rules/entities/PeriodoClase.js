'use strict';

module.exports = class {


    
  constructor(id = null, enterprise, clase, period,year, active,user,month,initDate,endDate) {
    this.id = id;
    this.clase = clase;
    this.active = active;
    this.period = period;
    this.year = year;
    this.user = user;
    this.enterprise = enterprise; 
    this.month = month;
    this.endDate =endDate;
    this.initDate = initDate;
  }



}