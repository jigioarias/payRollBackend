'use strict';

const User = require('../../enterprise_business_rules/entities/User');

module.exports = (firstName, lastName, email, password,user, enterprise, otro, { userRepository }) => {
  
  
  const userc = new User(null, firstName, lastName, email, password,user,enterprise,otro);
 
 
      return userRepository.persist(userc);

    
  
};
