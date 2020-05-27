'use strict';

const _serializeSingleSucursal = (sucursal) => {
  return {
    'id': sucursal.id,
    'enterprise': sucursal.enterprise,
    'code': sucursal.code,
    'address': sucursal.address,
    'description': sucursal.description,
    'phone':sucursal.phone,
    'active': sucursal.active,
    'user': sucursal.user,

  };
};
  

module.exports = class {

  serialize(data) {
    if (!data) {
      throw new Error('Expect data to be not undefined nor null');
    }
    if (Array.isArray(data)) {
      return data.map(_serializeSingleSucursal);
    }
    return _serializeSingleSucursal(data);
  }

};