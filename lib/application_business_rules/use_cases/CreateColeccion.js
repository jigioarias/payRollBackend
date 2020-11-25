'use strict';


module.exports = async(coleccionEntity, { coleccionRepository }) => {

    try {

        const ingreso = await coleccionRepository.persist(coleccionEntity);

        return ingreso;
    } catch (error) {
        console.log(error);
        return null;
    }

};
