'use strict';

const sequelize = require('../../frameworks_drivers/database/sequelize');
const Empleado = require('../../enterprise_business_rules/entities/Empleado');
const EmpleadoDTO = require('../../application_business_rules/use_cases/EmpleadoDTO');


module.exports = class {

  constructor() {
    this.db = sequelize;
    this.model = this.db.model('empleado');
    this.modelP =  this.db.model('persona');
    this.modelE =  this.db.model('empresa');
  }


  async find(enterprise,active) {

    const seqEmpleados = await this.model.findAll(
      {
                
         where: {active: active,enterprise:enterprise}}
     );

 
     return  seqEmpleados.map((seqEmpleado) => {
      
        return  new Empleado(seqEmpleado.id, seqEmpleado.enterprise, seqEmpleado.idPerson,seqEmpleado.salary, seqEmpleado.salaryType,
            seqEmpleado.initDateContract,seqEmpleado.endDateContract,seqEmpleado.costCenter,seqEmpleado.classPayRoll,
           seqEmpleado.departament,seqEmpleado.branchOffice,seqEmpleado.unity,seqEmpleado.area,seqEmpleado.active,seqEmpleado.user);

      });


  }

  async persist(empleadoEntry) {
  
  
    const { enterprise, idPerson, salary, salaryType,initDateContract,endDateContract, costCenter, classPayRoll, departament,branchOffice,unity,area,active,user ,transporteSubsidy} = empleadoEntry;
    

    let seqEmpleado = await this.model.findOne({ where: { idPerson: idPerson } });
  

    if (seqEmpleado){


      return new Empleado(seqEmpleado.id, seqEmpleado.enterprise, seqEmpleado.idPerson,seqEmpleado.salary, seqEmpleado.salaryType,
       seqEmpleado.initDateContract,seqEmpleado.endDateContract,seqEmpleado.costCenter,seqEmpleado.classPayRoll,
       seqEmpleado.departament,seqEmpleado.branchOffice,seqEmpleado.unity,seqEmpleado.area,seqEmpleado.active,seqEmpleado.user,seqEmpleado.transporteSubsidy);

    }
     
    seqEmpleado = await this.model.create({salary, salaryType,initDateContract,endDateContract, costCenter,
    departament,branchOffice,unity,active,user,transporteSubsidy,idPerson, enterprise,area,classPayRoll});
  
    await seqEmpleado.save();

 
    return new Empleado(seqEmpleado.id, seqEmpleado.enterprise, seqEmpleado.idPerson,seqEmpleado.salary, seqEmpleado.salaryType,
      seqEmpleado.initDateContract,seqEmpleado.endDateContract,seqEmpleado.costCenter,seqEmpleado.classPayRoll,
      seqEmpleado.departament,seqEmpleado.branchOffice,seqEmpleado.unity,seqEmpleado.area,seqEmpleado.active,seqEmpleado.user,seqEmpleado.transporteSubsidy);

    }

  
  async getByIdPerson(idPerson,active) {

    const seqEmpleado = await this.model.findOne({ where: { idPerson: idPerson,active:active } });
 
    return new Empleado(seqEmpleado.id, seqEmpleado.enterprise, seqEmpleado.idPerson,seqEmpleado.salary, seqEmpleado.salaryType,
      seqEmpleado.initDateContract,seqEmpleado.endDateContract,seqEmpleado.costCenter,seqEmpleado.classPayRoll,
      seqEmpleado.departament,seqEmpleado.branchOffice,seqEmpleado.unity,seqEmpleado.area,seqEmpleado.active,seqEmpleado.user,seqEmpleado.transporteSubsidy);

  }


  
  async merge(empleadoEntry) {

    const { enterprise, idPerson, salary, salaryType,initDateContract,endDateContract, costCenter, classPayRoll, departament,branchOffice,unity,area,active,user,transporteSubsidy } = empleadoEntry;
  
    let seqEmpleado = await this.model.findOne({ where: { idPerson: idPerson } });
  
    if (!seqEmpleado) return false;

    await seqEmpleado.update({ salary, salaryType,initDateContract,endDateContract, costCenter,
      departament,branchOffice,unity,active,user,transporteSubsidy,idPerson, enterprise,area,classPayRoll});
  
  
    return new Empleado(seqEmpleado.id, seqEmpleado.enterprise, seqEmpleado.idPerson,seqEmpleado.salary, seqEmpleado.salaryType,
      seqEmpleado.initDateContract,seqEmpleado.endDateContract,seqEmpleado.costCenter,seqEmpleado.classPayRoll,
      seqEmpleado.departament,seqEmpleado.branchOffice,seqEmpleado.unity,seqEmpleado.area,seqEmpleado.active,seqEmpleado.user,seqEmpleado.transporteSubsidy);
  }


  async findByClassPayRoll(enterprise,active,classPayRoll) {

    const seqEmpleados = await this.model.findAll(
      {
                
         where: {active: active,enterprise:enterprise,classPayRoll:classPayRoll}}
     );

 
     return  seqEmpleados.map((seqEmpleado) => {
      
    return new Empleado(seqEmpleado.id, seqEmpleado.enterprise, seqEmpleado.idPerson,seqEmpleado.salary, seqEmpleado.salaryType,
      seqEmpleado.initDateContract,seqEmpleado.endDateContract,seqEmpleado.costCenter,seqEmpleado.classPayRoll,
      seqEmpleado.departament,seqEmpleado.branchOffice,seqEmpleado.unity,seqEmpleado.area,seqEmpleado.active,seqEmpleado.user,seqEmpleado.transporteSubsidy);

      });


  }



};