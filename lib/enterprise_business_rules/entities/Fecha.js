'use strict';


module.exports = class {
    
  

     static restar(initDate,endDate) {
   
      let restaFecha =endDate- initDate ;
      let resta = (Math.round(restaFecha/ (1000*60*60*24)))+1;
      return resta;
    }
  

 

    static menorIgualQue(initDate,endDate) {

        return(initDate <= endDate);    
    }

    static mayorIgualQue(initDate,endDate) {
        return(initDate >= endDate);    
    }

}