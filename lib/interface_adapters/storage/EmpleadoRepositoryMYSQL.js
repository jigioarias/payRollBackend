'use strict';

const sequelize = require('../../frameworks_drivers/database/sequelize');
const Empleado = require('../../enterprise_business_rules/entities/Empleado');

module.exports = class {

  constructor() {
    this.db = sequelize;
    this.model = this.db.model('empleado');
  }


  async find() {

    const seqEmpleados = await this.model.findAll();

    return seqEmpleados.map((seqEmpleado) => {
      return new Empleado(seqEmpleado.id, seqEmpleado.enterprise, seqEmpleado.idPerson,seqEmpleado.salary, seqEmpleado.salaryType,
        seqEmpleado.initDateContract,seqEmpleado.endDateContract,seqEmpleado.costCenter,seqEmpleado.classPayRoll,
       seqEmpleado.departament,seqEmpleado.branchOffice,seqEmpleado.unity,seqEmpleado.area,seqEmpleado.active,seqEmpleado.user);
    });

  }

  async persist(empleadoEntry) {
  
  
    const { enterprise, idPerson, salary, salaryType,initDateContract,endDateContract, costCenter, classPayRoll, departament,branchOffice,unity,area,active,user } = empleadoEntry;
    

    let seqEmpleado = await this.model.findOne({ where: { idPerson: idPerson } });
  

    if (seqEmpleado){

      //seqEmpleado.uddate({ enterprise, idPerson, salary, salaryType,initDateContract,endDateContract, costCenter, classPayRoll,departament,branchOffice,unity,area,active,user});

      return new Empleado(seqEmpleado.id, seqEmpleado.enterprise, seqEmpleado.idPerson,seqEmpleado.salary, seqEmpleado.salaryType,
       seqEmpleado.initDateContract,seqEmpleado.endDateContract,seqEmpleado.costCenter,seqEmpleado.classPayRoll,
       seqEmpleado.departament,seqEmpleado.branchOffice,seqEmpleado.unity,seqEmpleado.area,seqEmpleado.active,seqEmpleado.user);

    }

 
  
      seqEmpleado = await this.model.create({ enterprise, idPerson, salary, salaryType,initDateContract,endDateContract, costCenter, classPayRoll,
       departament,branchOffice,unity,area,active,user});
  
    await seqEmpleado.save();

    return new Empleado(seqEmpleado.id, seqEmpleado.enterprise, seqEmpleado.idPerson,seqEmpleado.salary, seqEmpleado.salaryType,
      seqEmpleado.initDateContract,seqEmpleado.endDateContract,seqEmpleado.costCenter,seqEmpleado.classPayRoll,
     seqEmpleado.departament,seqEmpleado.branchOffice,seqEmpleado.unity,seqEmpleado.area,seqEmpleado.active,seqEmpleado.user);

    }

  
  async getByIdPerson(idPerson) {
  
    const seqEmpleado = await this.model.findOne({ where: { idPerson: idPerson } });
    return new Empleado(seqEmpleado.id, seqEmpleado.enterprise, seqEmpleado.idPerson,seqEmpleado.salary, seqEmpleado.salaryType,
      seqEmpleado.initDateContract,seqEmpleado.endDateContract,seqEmpleado.costCenter,seqEmpleado.classPayRoll,
     seqEmpleado.departament,seqEmpleado.branchOffice,seqEmpleado.unity,seqEmpleado.area,seqEmpleado.active,seqEmpleado.user);


  }


};