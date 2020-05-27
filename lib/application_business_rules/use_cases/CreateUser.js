'use strict';

const User = require('../../enterprise_business_rules/entities/User');

module.exports = (firstName, lastName, email, password, { userRepository }) => {
  
  
  const user = new User(null, firstName, lastName, email, password);
  var userc = null;
  
  if(user.validarDatos(user)){
      userc = userRepository.getByEmail(email).then(function(data) { 
      return data; 
    }).catch(function(errorMessage) { 
      return userRepository.persist(user);
  }); 
  }
return userc;
    
  
};
