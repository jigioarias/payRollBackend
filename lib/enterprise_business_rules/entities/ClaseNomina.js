'use strict';

module.exports = class {

  constructor(id = null, enterprise, clase, description, vacationdays,vacationprima,primatype,provisionservicedays,provisionservicetype,payrolltype,monthhours,dayshours,bank,bankbranch,account,user,workweek,
    periodType) {
    this.id = id;
    this.enterprise = enterprise;
    this.clase= clase;
    this.description = description;
    this.vacationdays = vacationdays;
    this.vacationprima = vacationprima;
    this.primatype = primatype;
    this.provisionservicedays = provisionservicedays
    this.provisionservicetype = provisionservicetype;
    this.payrolltype = payrolltype;
    this.monthhours = monthhours;
    this.dayshours = dayshours;
    this.bank = bank;
    this.bankbranch = bankbranch;
    this.account = account;
    this.user = user;
    this.workweek = workweek;
    this.periodType = periodType;
  }


  

}



