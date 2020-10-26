'use strict';

const empleado = require('../../enterprise_business_rules/entities/Empleado');
const EmpleadoDTO = require('../../application_business_rules/use_cases/EmpleadoDTO');

const {EMPLEADO_NO_ENCONTRADO, ERROR_VALIDATE, ERROR_TECNICO} =require('./constantesValidacion')




module.exports = async (empleado,{ empleadoRepository },{personaRepository}) => {

  let lista = [];
  let empleadoDTO = null;
  try {
    
      
        let persona = null;   
        let listaEmpleados= null;
        let busquedaDocumento = false;
        
        let documento = empleado.person.document;
        //console.log('empleado.employee.classPayRoll',empleado.employee.classPayRoll);
        //console.log('documento empleado ',empleado.person.document);

        if( empleado.person ==null || (empleado.person.document ==null || empleado.person.document.trim()=='') ){
                 listaEmpleados= await empleadoRepository.find(empleado.employee);
                 busquedaDocumento = false;
                 documento = empleado.person.document;
                for (let index = 0; index < listaEmpleados.length || busquedaDocumento; index++) {
                  const element = listaEmpleados[index];
                  persona = await personaRepository.get(element.idPerson);
                  if(documento !=null && persona.document == documento){
                          lista.push(new EmpleadoDTO(persona,element));
                          busquedaDocumento = true;
                  }else{
                    lista.push(new EmpleadoDTO(persona,element));
                  }        
                
                }
       
          
        }else{

                console.log('ELSE documento empleado ',empleado.person.document);

            let personaE =  await personaRepository.getByDocument(empleado.person.document);
            let empleadoE = null;
            if(personaE!=null){
               empleadoE = await empleadoRepository.getByIdPerson(personaE.id,empleado.employee.active) ;
               lista.push(new EmpleadoDTO(personaE,empleadoE));
              }else{
                 empleadoDTO = new EmpleadoDTO(persona,empleadoE);
                empleadoDTO.setError(EMPLEADO_NO_ENCONTRADO);
                lista.push(empleadoDTO);
                }


        }
      
    
  } catch (error) {

   // console.log('Error:',error);    
    empleadoDTO = new EmpleadoDTO(null,null);
    empleadoDTO.setError(ERROR_TECNICO);
    lista.push(empleadoDTO);
    
  }
  return lista;


  
};
