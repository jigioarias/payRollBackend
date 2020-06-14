'use strict';

module.exports = class {



    
  constructor(id = null, enterprise,clase, employeeId, document, name,address,email,phone,period,concept,conceptName,valor,percentaje,conceptType,InitDayPay,endDayPay,type,user) {
    this.id = id;
    this.enterprise = enterprise;
    this.clase= clase;
    this.employeeId = employeeId;
    this.document = document;
    this.name = name;
    this.address = address;
    this.email = email;
    this.phone = phone;
    this.period = period;
    this.concept =concept
    this.conceptName = conceptName;
    this.user = user;
    this.valor = valor;
    this.percentaje = percentaje;
    this.conceptType = conceptType;
    this.type = type;
    this.InitDayPay= InitDayPay;
    this.endDayPay = endDayPay; 
  }

  
}
      

  