'use strict';



module.exports = async (subsidioTransporte,salario,diasTipoNomina,diasSalario,enterprise,{ parametroRepository }) => {

    try {
            
       
        let auxilio = 0;

        let valorAuxilio = await parametroRepository.findByDescription(enterprise,'valorAuxilioTransporte');



        if(subsidioTransporte && salario <= parseInt(valorAuxilio)){
            auxilio =  (valorAuxilio/diasTipoNomina)*diasSalario;
        }

        return auxilio;

    } catch (error) {
        console.log(error);
        return null;    
    }


  
};
