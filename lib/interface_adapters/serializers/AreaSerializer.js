'use strict';

const _serializeSingleArea = (area) => {
  return {
    'id': area.id,
    'enterprise': area.enterprise,
    'code': area.code,
    'unity': area.unity,
    'description': area.description,
    'active': area.active,
    'user': area.user,

  };
};
  

module.exports = class {

  serialize(data) {
    if (!data) {
      throw new Error('Expect data to be not undefined nor null');
    }
    if (Array.isArray(data)) {
      return data.map(_serializeSingleArea);
    }
    return _serializeSingleArea(data);
  }

};