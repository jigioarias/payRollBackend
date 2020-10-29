'use strict';

module.exports = async(id,{ periodoClaseRepository }) => {

  
  const periodo =  await periodoClaseRepository.get(id);
  return periodo;
};
