'use strict';



module.exports = async (enterprise,description,{ parametroRepository }) => {

    try {
            
       
        let parametro = await parametroRepository.findByDescription(enterprise,description);

        return parametro;

    } catch (error) {
        console.log(error);
        return null;    
    }


  
};
