  'use strict';

const _serializeSingleResponse = (response) => {
  return {
    'content': response.content,
    'message': response.message,
    'error': response.error
  };
};

module.exports = class {

  serialize(data) {
    if (!data) {
      throw new Error('Expect data to be not undefined nor null');
    }
    if (Array.isArray(data)) {
      return data.map(_serializeSingleResponse);
    }
    return _serializeSingleResponse(data);
  }

};