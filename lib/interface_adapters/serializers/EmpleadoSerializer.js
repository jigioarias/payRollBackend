'use strict';

const _serializeSingleEmpleado = (empleado) => {
  return {
    'id': empleado.id,
    'firstName': empleado.firstName,
    'lastName': empleado.lastName,
    'phone': empleado.phone,
    'email': empleado.email,
    'document': empleado.document,
    'typeDocument':empleado.typeDocument,
    'salary':empleado.salary,
    'nit':empleado.nit,
    'payRollType':empleado.payRollType,
    'salaryType':empleado.salaryType,
    'active':empleado.active,
    'address':empleado.address,
    "country":empleado.country,
    "departament":empleado.departament,
    "municipality":empleado.municipality
  };
};

module.exports = class {

  serialize(data) {
    if (!data) {
      throw new Error('Expect data to be not undefined nor null');
    }
    if (Array.isArray(data)) {
      return data.map(_serializeSingleEmpleado);
    }
    return _serializeSingleEmpleado(data);
  }

};