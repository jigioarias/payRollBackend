'use strict';

module.exports = class {



    
  constructor(id = null, enterprise, document, 
    initDate, endDate,type,
    remuneration,user,
    employeeId,year,
     registerPeriod,clase,salary,state,hours) {
    this.id = id;
    this.enterprise = enterprise;
    this.document= document;
    this.initDate = initDate;
    this.endDate = endDate;
    this.user = user;
    this.type = type;
    this.remuneration = remuneration;
    this.employeeId =employeeId;
    this.year = year; 
    this.registerPeriod = registerPeriod;
    this.clase = clase;
    this.salary = salary;
    this.state = state;
    this.hours = hours;
 
  }


  

}
      