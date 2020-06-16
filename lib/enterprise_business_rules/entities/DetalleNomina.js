'use strict';

module.exports = class {



    
  constructor(id = null, enterprise, payrollId, employeeId, concept,period,conceptName,valor,percentaje,conceptType,type,user) {
    this.id = id;
    this.enterprise = enterprise;
    this.payrollId= payrollId;
    this.employeeId = employeeId;
    this.period = period;
    this.concept =concept
    this.conceptName = conceptName;
    this.user = user;
    this.valor = valor;
    this.percentaje = percentaje;
    this.conceptType = conceptType;
    this.type = type; 
  }

  
}
      

  