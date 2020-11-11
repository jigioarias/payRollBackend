'use strict';

const Licencia = require('../../enterprise_business_rules/entities/Licencia');
const Incapacidad = require('../../enterprise_business_rules/entities/Incapacidad');
const { CODIGO_APROBADO } = require('../../interface_adapters/controllers/constantesSistema');



module.exports = async (idEmpresa, empleado, documento, active, ano, fechaInicialSolicitud, fechaFinalSolicitud, { vacacionRepository }, { licenciaRepository }, { incapacidadRepository }) => {



    try {


        let fechaInicialValidacion = null;
        let fechaFinalValidacion = null;

        const listaVacaciones = await vacacionRepository.find(idEmpresa, empleado.id, ano, empleado.classPayRoll, true);

        let existeNovedad = false;
        let vacacion = null;

        for (let index = 0; index < listaVacaciones.length && !existeNovedad; index++) {
            vacacion = listaVacaciones[index];

            fechaInicialValidacion = new Date(vacacion.enjoyInitDate);
            fechaFinalValidacion = new Date(vacacion.enjoyEndDate);

            if ((fechaInicialValidacion <= fechaInicialSolicitud && fechaInicialSolicitud <= fechaFinalValidacion)
                || (fechaInicialValidacion <= fechaFinalSolicitud && fechaFinalSolicitud <= fechaFinalValidacion)) {
                existeNovedad = true;
            }
            // console.log('existe una novedad vacaciones',existeNovedad); 

        }

        //licencias
        if (!existeNovedad) {

            const licenciaEntity = new Licencia(null, idEmpresa, documento, null, null, null, null, null, empleado.id, ano, null, empleado.classPayRoll, null, CODIGO_APROBADO);
            const listaLicencias = await licenciaRepository.find(licenciaEntity);


            let licencia = null;
            for (let index = 0; index < listaLicencias.length && !existeNovedad; index++) {

                licencia = listaLicencias[index];

                fechaInicialValidacion = new Date(licencia.initDate);
                fechaFinalValidacion = new Date(licencia.endDate);

                if ((fechaInicialValidacion <= fechaInicialSolicitud && fechaInicialSolicitud <= fechaFinalValidacion)
                    || (fechaInicialValidacion <= fechaFinalSolicitud && fechaFinalSolicitud <= fechaFinalValidacion)) {
                    existeNovedad = true;
                }

            }
            //console.log('existe una novedad licencias',existeNovedad); 

        }

        // valida incapacidades

        if (!existeNovedad) {
            const incapacidadEntity = new Incapacidad(null, idEmpresa, documento, null, null, null, null, empleado.id, ano, null, empleado.classPayRoll, null, CODIGO_APROBADO, null);
            const listaIncapacidads = await incapacidadRepository.find(incapacidadEntity);

            let incapacidad = null;
            for (let index = 0; index < listaIncapacidads.length && !existeNovedad; index++) {
                incapacidad = listaIncapacidads[index];

                fechaInicialValidacion = new Date(incapacidad.initDate);
                fechaFinalValidacion = new Date(incapacidad.endDate);

                if ((fechaInicialValidacion <= fechaInicialSolicitud && fechaInicialSolicitud <= fechaFinalValidacion)
                    || (fechaInicialValidacion <= fechaFinalSolicitud && fechaFinalSolicitud <= fechaFinalValidacion)) {
                    existeNovedad = true;
                }

            }

        }

        return existeNovedad;

    } catch (error) {
        console.log('Error:', error);
        return false;
    }

};
