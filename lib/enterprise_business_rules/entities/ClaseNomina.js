'use strict';

module.exports = class {

  constructor(id = null, enterprise, clase, description, vacationDays,vacationPrima,primatype,provisionservicedays,provisionservicetype,payrolltype,monthhours,dayshours,bank,bankbranch,account,user) {
    this.id = id;
    this.enterprise = enterprise;
    this.class= clase;
    this.description = description;
    this.vacationDays = vacationDays;
    this.vacationPrima = vacationPrima;
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
  }


  

}



