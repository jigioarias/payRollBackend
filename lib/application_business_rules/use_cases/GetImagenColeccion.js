'use strict';

const imagencoleccion = require("../../frameworks_drivers/webserver/imagencoleccion");


module.exports = async(imagenColeccionEntity, { imagenColeccionRepository }) => {
    try {

        const imagenColeccion = await imagenColeccionRepository.getByDocument(imagenColeccionEntity);
        console.log('objeto imagen::',imagencoleccion);
        return imagenColeccion;

    } catch (error) {
        console.log(error);
        return null;
    }

};
