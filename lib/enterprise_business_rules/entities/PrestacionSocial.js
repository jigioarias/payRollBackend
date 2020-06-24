'use strict';

module.exports = class {

   
  constructor(id = null, enterprise,clase, employeeId, document, period,valor,monthSalary,salary,InitDayPay,endDayPay,type,user,discount) {
    
    this.id = id;
    this.enterprise = enterprise;
    this.clase= clase;
    this.employeeId = employeeId;
    this.period = period;
    this.valor = valor;
    this.monthSalary =monthSalary
    this.salary = salary;
    this.type = type;
    this.InitDayPay= InitDayPay;
    this.endDayPay = endDayPay; 
    this.user = user;
    this.document = document;
    this.discount = discount;
  }

  
}
      

  
