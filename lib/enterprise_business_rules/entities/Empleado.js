'use strict';


module.exports = class {


  constructor(id = null, enterprise, idPerson, salary, salaryType,initDateContract,endDateContract, costCenter, classPayRoll, departament,branchOffice,unity,area,active,user,transporteSubsidy ) 
  {
    this.id = id;
    this.enterprise = enterprise;
    this.idPerson = idPerson;
    this.salary = salary;
    this.salaryType=salaryType ;
    this.initDateContract=initDateContract;
    this.endDateContract =endDateContract;
    this.costCenter = costCenter;
    this.classPayRoll= classPayRoll;
    this.departament = departament;
    this.branchOffice = branchOffice;
    this.active = active,
    this.unity= unity,
    this.area= area,
    this.user= user,
    this.transporteSubsidy = transporteSubsidy
  }


  validarDatos(empleado){
   
   if (empleado.idPersona !=""){

        return empleado;
    }
     
    console.log('empleado invalido');
    return null;
    
}



}





  

  