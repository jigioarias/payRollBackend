'use strict';

module.exports = class {

    constructor(repository) {
        this.repository = repository;
    }

  async  persist(conceptoEntity) {
        return this.repository.persist(conceptoEntity);
    }

    async remove(conceptoId) {
        return await this.repository.remove(conceptoId);
    }

    async get(conceptoId) {
        try {

            const concepto = await this.repository.get(conceptoId);
            return concepto;

        } catch (error) {
            console.log(error);
            return null;
        }


    }

    find(enterprise) {
        return this.repository.find(enterprise);
    }




};