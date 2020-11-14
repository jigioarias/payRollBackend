'use strict';

module.exports = (user, { userRepository }) => {

  return userRepository.getByUser(user);
};
