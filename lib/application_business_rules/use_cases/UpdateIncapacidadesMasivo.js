 
  module.exports = async(listaIncapacidades,{ incapacidadRepository }) => {
    
try {
    let lista = [];
    let incapacidadc = null;
 
  
    for (let index = 0; index < listaIncapacidades.length; index++) {
        const element = listaIncapacidades[index];
        incapacidadc = await incapacidadRepository.merge(element.incapacidad);
        lista.push(incapacidadc);
                      
    }     
      return lista;

    } catch (error) {
      console.log(error);
      return null;
    }  
  
}; 
