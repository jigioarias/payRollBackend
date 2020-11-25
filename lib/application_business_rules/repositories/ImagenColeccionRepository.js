'use strict';

module.exports = class {

    constructor(repository) {
        this.repository = repository;
    }

  async  persist(coleccionEntity) {
        return this.repository.persist(coleccionEntity);
    }

    async  getByDocument(imagenColeccionEntity) {

        return this.repository.getByDocument(imagenColeccionEntity);
    }


    async remove(id) {
        return await this.repository.remove(id);
    }

    async get(id) {
        try {

            const concepto = await this.repository.get(id);
            return concepto;

        } catch (error) {
            console.log(error);
            return null;
        }


    }

    async  find(enterprise) {
        return this.repository.find(enterprise);
    }

   

};