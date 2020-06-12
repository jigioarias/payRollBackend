'use strict';
const Fecha  = require('../../enterprise_business_rules/entities/Fecha');

module.exports = class {
    
  

     static calcularDiasNomina(initDateContract,endDateContract,initDatePeriod,endDatePeriod) {
   

        let menorFechaInicioContrato = false;
        let menorFechaFinContrato = false;
        let menorFechaPeriodo = false;
        let menorFFPyFCC = false;
        let dias = 0;


        menorFechaInicioContrato = Fecha.menorIgualQue(initDateContract,initDatePeriod);
        menorFechaFinContrato = Fecha.menorIgualQue(endDateContract,initDatePeriod);
       
        
       if(!menorFechaFinContrato){
         

         if( menorFechaInicioContrato){

           menorFechaPeriodo =  Fecha.menorIgualQue(endDatePeriod,endDateContract);
           if(menorFechaPeriodo){
              dias = Fecha.restar(initDatePeriod,endDatePeriod); 
           }else{
             dias = Fecha.restar(initDatePeriod,endDateContract); 

           }
         }else{

             menorFFPyFCC = Fecha.menorIgualQue(endDatePeriod,endDateContract);
             if(menorFFPyFCC){
               dias = Fecha.restar(initDateContract,endDatePeriod);
             }else{
               dias = (Fecha.restar(endDateContract,endDatePeriod)-Fecha.restar(initDatePeriod,initDateContract))+1;
             }
         }

       }else{
         dias = 0;
       }


        return dias;
    }
  

 

    static calcularConceptosBasicosNomina(salario,conceptosNominaBasicos) {

        let valorConcepto = 0;
        let salarioEmpleado = 0;
        conceptosNominaBasicos.forEach(iconcepto => {
                       
         valorConcepto =   ((((iconcepto.percentaje==0)?iconcepto.value:salario*(iconcepto.percentaje/100))));
  
        if(iconcepto.fittype=='R'){
              valorConcepto = valorConcepto*(-1)
         }            
             salarioEmpleado = salarioEmpleado + valorConcepto;  
  
        });
        
        return salarioEmpleado;
    }
    
    static  calcularAuxilioTransporte(subsidioTransporte,salario,diasTipoNomina,diasSalario,valorAuxilio,valorSalarioTransporte){

        try {
            
    
        let auxilio = 0;

        if(subsidioTransporte && salario <= parseInt(valorSalarioTransporte)){
            auxilio =  (valorAuxilio/diasTipoNomina)*diasSalario;
        }

        return auxilio;

    } catch (error) {
        console.log(error);
        return null;    
    }
    }

}