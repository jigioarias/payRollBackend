'use strict';
const NovedadNomina = require('../../enterprise_business_rules/entities/NovedadNomina');
const Nomina = require('../../enterprise_business_rules/entities/Nomina');


module.exports = async (enterprise,employeeId,document,year,period,clase,initDate,endDate, { vacacionRepository}) => {

  try {

   
   console.log('repository novedad',vacacionRepository);
//   const novedadNomina = new NovedadNomina(null,enterprise,clase,employeeId,null,null,period,null,null,null,null,null,null); 
   
   
   const listaVacaciones =  await vacacionRepository.find(enterprise, employeeId, year, clase);
  
   listaVacaciones.forEach(vacacion => {
       
          console.log('periodo',period,vacacion.registerPerdiod);

          if(vacacion.registerPerdiod == period ){


            console.log('si son iguales');
          }  

   });   


   //  return lista;

  // buscar vacaciones persona


  


/*  mominaRegistro = new Nomina(
    null,
    empresaId,
    empleado.employee.id,
    empleado.person.document,
    empleado.person.firstName + ' '+ empleado.person.lastName,
    empleado.person.address,
    empleado.person.email,
    empleado.person.phone,
    periodValue,
    salario,
    salarioMensual,
    salarioTotal,
    fechaInicioPeriodo,
    fechaFinPeriodo,
    'P',
    dias,
    user,
    );

*/




  } catch (error) {
    console.log(error);
    return null;    
  }



};
