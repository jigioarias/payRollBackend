'use strict';


module.exports = async(coleccionEntity, { imagenColeccionRepository }) => {
    try {

        const ingreso = await imagenColeccionRepository.persist(coleccionEntity);
        return ingreso;

    } catch (error) {
        console.log(error);
        return null;
    }

};
