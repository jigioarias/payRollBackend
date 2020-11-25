'use strict';

const sequelize = require('../../frameworks_drivers/database/sequelize');
const ImagenColeccion = require('../../enterprise_business_rules/entities/ImagenColeccion');
const { Op } = require("sequelize");
    
module.exports = class {

    constructor() {
        this.db = sequelize;
        this.model = this.db.model('imagencoleccion');
    }

    async persist(imagenColeccionEntity) {

        const { enterprise,coleccion, documento, faceId, imagenId, active, user } = imagenColeccionEntity;

        const seqimagencoleccion = await this.model.create({ enterprise,coleccion, documento, faceId, imagenId, active, user });

        await seqimagencoleccion.save();

        return new ImagenColeccion(seqimagencoleccion.id, seqimagencoleccion.enterprise,
            seqimagencoleccion.coleccion, 
            seqimagencoleccion.documento,
            seqimagencoleccion.faceId, seqimagencoleccion.imagenId,
            seqimagencoleccion.active, seqimagencoleccion.user
        );
    }



    async remove(faceId) {
        const seqimagencoleccion = await this.model.findOne(
                {
                    where: { faceId: faceId }
                }
            );
        if (seqimagencoleccion) {
            return seqimagencoleccion.destroy();
        }
        return false;
    }

    async get(coleccionId) {
        const seqimagencoleccion = await this.model.findByPk(coleccionId);

        return new ImagenColeccion(seqimagencoleccion.id, seqimagencoleccion.enterprise,
            seqimagencoleccion.coleccion, 
            seqimagencoleccion.documento,
            seqimagencoleccion.faceId, seqimagencoleccion.imagenId,
            seqimagencoleccion.active, seqimagencoleccion.user
        );

    }

    async getByDocument(imagenColeccionEntity) {

        console.log('en repo::',imagenColeccionEntity);
        const seqimagencoleccion = await this.model.findOne(
            {
                where: { enterprise: imagenColeccionEntity.enterprise ,
                         documento:imagenColeccionEntity.documento}
            }
        );
        console.log('seq ::',seqimagencoleccion);

        return new ImagenColeccion(seqimagencoleccion.id, seqimagencoleccion.enterprise,
            seqimagencoleccion.coleccion, 
            seqimagencoleccion.documento,
            seqimagencoleccion.faceId, seqimagencoleccion.imagenId,
            seqimagencoleccion.active, seqimagencoleccion.user
        );
    


    }

    async find(enterprise) {

        const seqcoleccions = await this.model.findAll(
            {

                where: { enterprise: enterprise }
            }

        );

        return seqcoleccions.map((seqimagencoleccion) => {
            return new ImagenColeccion(seqimagencoleccion.id, seqimagencoleccion.enterprise,
                seqimagencoleccion.coleccion, 
                seqimagencoleccion.documento,
                seqimagencoleccion.faceId, seqimagencoleccion.imagenId,
                seqimagencoleccion.active, seqimagencoleccion.user
            );

        });

    }


};