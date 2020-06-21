'use strict';

const Sequelize = require('sequelize');
const {DATABASE_NAME,USERNAME,PASSWORD,HOST,DIALECT} =require('./constantes')


console.log('DATABASE',DATABASE_NAME);
console.log('usuario',USERNAME);


const sequelize = new Sequelize(DATABASE_NAME, USERNAME, PASSWORD, {
    host: HOST,
    dialect: DIALECT,
    port:3306,
    pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000
    }
    });


//const sequelize = new Sequelize({ dialect: 'sqlite' });

//sequelize.import('./models/Areas');
sequelize.import('./models/CentroCostos');
sequelize.import('./models/CentroCostosEmpleado');
//sequelize.import('./models/ClaseNomina');
sequelize.import('./models/Conceptos');
sequelize.import('./models/Empleado');
sequelize.import('./models/ConceptosNomina');
//sequelize.import('./models/Empresas');
sequelize.import('./models/GrupoEmpresas');
sequelize.import('./models/NovedadesNomina');
sequelize.import('./models/Parametro');
sequelize.import('./models/Nomina');
sequelize.import('./models/DetalleNomina');
sequelize.import('./models/PeriodosNomina');
//sequelize.import('./models/Persona');
sequelize.import('./models/Sucursal');
sequelize.import('./models/PrestacionesSociales');
sequelize.import('./models/Unidades');
const User= sequelize.import('./models/User');



module.exports = sequelize;