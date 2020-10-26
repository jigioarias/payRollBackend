const { CODIGO_APROBADO, ESTADO_PRESTAMO_PENDIENTE } = require("../../interface_adapters/controllers/constantesSistema");

//conceptos
const CONCEPTO = 'El concepto es requerido';

//persona
const NOMBRE = 'El nombre de la persona es requerido';
const APELLIDOS = 'El o los apellidos son requeridos';
const TELEFONO = 'El telefono es requerido';
const CORREO = 'El correo electronico es requerido';
const DOCUMENTO = 'El documento de identidad es requerido';
const TIPO_DOCUMENTO= 'El tipo de documento es requerido';
const DIRECCION = 'La direccion es requerida';
const PAIS= 'El país es requerido';
const DEPARTAMENTO_PESONA= 'El departamento es requerido';
const MUNICIPIO='El municipio es requerido';
const ESTADO_CIVIL = 'El estado de civil es requerido';

//empleados
const ID_EMPLEADO = 'Id empleado es obligatorio';
const ENTERPRISE='La empresa es obligatoria';
const ID_PERSONA ='El id persona Es obligatorio';
const CLASE ='La clase de Nomina es Obligatoria';
const SUCURSAL ='La sucursal es obligatoria';
const SALARIO ='El salario es requerido y debe ser mayor a cero';
const TIPO_SALARIO = 'El tipo de salario es requerido';
const FECHA_INICIO_CONTRATO ='La fecha de inicio de contrato es obligatoria'
const  FECHA_FIN_CONTRATO_MENOR='La fecha de fin  de contrato es menor que la fecha de inicio de contrato';
const  CENTRO_COSTOS='EL centro de costos es obligatorio';
const DEPARTAMENTO = 'El departamento es obligatorio';
const UNIDAD = "La unidad es requerida";
const AREA = "El area es requerida";
const CARGA_MASIVA_EMPLEADO = 'Error en algunos registros de la carga masiva de empleado';
const EMPLEADO_NO_ENCONTRADO = 'Empleado no encontrado';




//Horas extras
const PERIODO = 'El periodo es requerido';
const HOURS ="Las horas son menores o iguales a cero";
const VALOR_REQUERIDO = "El valor es igual o menor a cero";
const FECHA_NOVEDAD = "La fecha de novedad es requerida";
 

//Generico
const ERROR_TECNICO = 'Error tecnico en el servidor';
const ERROR_VALIDATE = 'Error validando los datos'; 



module.exports = {
    //PERSONA
    NOMBRE :NOMBRE,
    APELLIDOS :APELLIDOS,
     TELEFONO : TELEFONO,
     CORREO : CORREO,
     DOCUMENTO : DOCUMENTO,
    TIPO_DOCUMENTO: TIPO_DOCUMENTO,
     DIRECCION : DIRECCION,
     PAIS: PAIS,
     DEPARTAMENTO_PERSONA: DEPARTAMENTO_PESONA,
     MUNICIPIO: MUNICIPIO,
     ESTADO_CIVIL : ESTADO_CIVIL,
        

    //EMPLEADO
    ENTERPRISE: ENTERPRISE,
    ID_PERSONA:ID_PERSONA,
    SALARIO:SALARIO,
    SUCURSAL :SUCURSAL,
    CLASE : CLASE,
    TIPO_SALARIO :TIPO_SALARIO,
    FECHA_INICIO_CONTRATO: FECHA_INICIO_CONTRATO,
    FECHA_FIN_CONTRATO_MENOR :FECHA_FIN_CONTRATO_MENOR,
    CENTRO_COSTOS : CENTRO_COSTOS,
    DEPARTAMENTO : DEPARTAMENTO,
    UNIDAD :UNIDAD,
    AREA:AREA,
    ID_EMPLEADO: ID_EMPLEADO,
    EMPLEADO_NO_ENCONTRADO : EMPLEADO_NO_ENCONTRADO,

    //HORAS EXTRAS
    PERIODO : PERIODO,
    HOURS : HOURS,
    VALOR_REQUERIDO :VALOR_REQUERIDO,
    CONCEPTO : CONCEPTO,
    FECHA_NOVEDAD :FECHA_NOVEDAD,

    //GENERICO
    ERROR_TECNICO :ERROR_TECNICO,
    ERROR_VALIDATE :ERROR_VALIDATE,
    CARGA_MASIVA_EMPLEADO :CARGA_MASIVA_EMPLEADO
}

