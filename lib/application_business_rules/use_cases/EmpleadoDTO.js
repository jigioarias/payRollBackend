'use strict';


module.exports = class {

  classPayRoll =null;
  period = null;
  workweek = null;
  calendarwork =null;

  constructor(person,employee) {
     this.person= person;
    this.employee = employee;
  }


 setClassPayRoll(newVal){ 
     this.classPayRoll = newVal;
    
}

setPeriod(newVal){ 
  this.period = newVal;
 
}

setWorkWeek(newVal){
   this.workweek = newVal;

}
setCalendarWork(newVal){

  this.calendarwork = newVal;
}

}





  

  