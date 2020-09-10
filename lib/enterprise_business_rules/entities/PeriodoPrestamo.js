'use strict';

module.exports = class {

    
  constructor(id = null, enterprise,employeeId, document, idLoan,fee, interests,period,type,state,user) {
    this.id = id;
    this.enterprise = enterprise;
    this.document= document;
    this.employeeId =employeeId;
    this.idLoan = idLoan;
    this.fee = fee;//cuota
    this.period = period;
    this.type = type;
    this.interests = interests;
    this.state = state;
    this.user = user;

}


  

}
      