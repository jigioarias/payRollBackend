'use strict';

module.exports = (user, { userRepository }) => {
  
  console.log('get User', user);
  return userRepository.getByUser(user);
};
