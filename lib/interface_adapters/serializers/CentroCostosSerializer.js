'use strict';

const _serializeSinglecentroCostos = (centroCostos) => {
 
   console.log('serialize>>>>',centroCostos.brachOffice);
    return {
    'id': centroCostos.id,
    'enterprise': centroCostos.enterprise,
    'code': centroCostos.code,
    'description': centroCostos.description,
    'active': centroCostos.active,
    'user': centroCostos.user,
    'brachOffice': centroCostos.brachOffice,
       };
};
  

module.exports = class {

  serialize(data) {
    if (!data) {
      throw new Error('Expect data to be not undefined nor null');
    }
    if (Array.isArray(data)) {
      return data.map(_serializeSinglecentroCostos);
    }
    return _serializeSinglecentroCostos(data);
  }

};