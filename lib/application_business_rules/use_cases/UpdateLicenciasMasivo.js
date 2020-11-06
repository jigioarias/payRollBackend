

//module.exports = (enterprise, idPerson, salary, salaryType,initDateContract,endDateContract, costCenter, classPayRoll, departament,branchOffice,unity,area,active,user,{ licenciaRepository }) => {
 
  module.exports = async(listaLicencias,{ licenciaRepository }) => {
 
    
try {
    let lista = [];
    let licenciac = null;
 
  
    for (let index = 0; index < listaLicencias.length; index++) {
        const element = listaLicencias[index];
        licenciac = await licenciaRepository.merge(element.licencia);
        lista.push(licenciac);
                      
    }     
      return lista;

    } catch (error) {
      console.log(error);
      return null;
    }  
  
}; 
