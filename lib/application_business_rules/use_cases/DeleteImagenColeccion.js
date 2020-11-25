'use strict';


module.exports = async(faceId, { imagenColeccionRepository }) => {
    try {

        const borrado = await imagenColeccionRepository.remove(faceId);
        return borrado;

    } catch (error) {
        console.log(error);
        return null;
    }

};
