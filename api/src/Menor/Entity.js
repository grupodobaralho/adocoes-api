"use strict";

import Joi from "joi";
import StringHelper from "../Common/StringHelper";

export default class Entity {
    constructor(deps = {}) {
		this.Adapter = deps.Adapter || new(require("./Adapter").default)();
    }

    create(body) {
        return this.Adapter.save(body);
    }

    fetchAll() {
        return new Promise((resolve, rjct) => {
            //Retorna entidades do banco de dados
            let body = this.Adapter.fetchAll().then(body => {
                //Para cada entidade, reduzir a quantidade das informações
                return body.map(this._createDefaultDTO);
            });

            return resolve(body);
        });
    }

    fetchAllAnonymous() {
        return new Promise((resolve, rjct) => {
            //Retorna entidades do banco de dados
            let body = this.Adapter.fetchAll().then(body => {
                //Para cada entidade, reduzir a quantidade das informações
                return body.map(this._createNewAnonymousDTO);
            });

            return resolve(body);
        });
    }

    //Cria "DTO" com valores reduzidos
    _createNewAnonymousDTO(entity) {
        //Transforma nome em somente iniciais
        entity.nome = StringHelper.getOnlyNameInitials(entity.nome);

        return entity;
    }

    //Cria "DTO" com formas padrão
    _createDefaultDTO(entity) {
        //Transforma nome em somente primeiro nome
        entity.nome = StringHelper.getOnlyFirstName(entity.nome);

        return entity;
    }

    fetchById(id) {
        return new Promise((resolve, rjct) => {
            //Retorna entidades do banco de dados
            let body = this.Adapter.fetchById(id).then(dto => {
                //Para cada entidade, reduzir a quantidade das informações
                return this._createDefaultDTO(dto);
            });

            return resolve(body);
        });
    }

    fetchByIdAnonymous(id) {
        return new Promise((resolve, rjct) => {
            //Retorna entidades do banco de dados
            let body = this.Adapter.fetchById(id).then(dto => {
                //Para cada entidade, reduzir a quantidade das informações
                return this._createNewAnonymousDTO(dto);
            });

            return resolve(body);
        });
    }

    find(body) {
        return this.Adapter.fetch(body.id);
    }

    remove(body) {
        return this.Adapter.delete(body.id);
    }

    delete(id) {
        return this.Adapter.delete(id);
    }

    deleteInterested(body) {
        return this.Adapter.deleteInterested(body);
    }

    update(id, body) {
        return this.Adapter.update(id, body);
    }

    getOrdination(body) {
        return this.Adapter.fetchOrdination();
    }

    postInterested(body) {
        return this.Adapter.postInterested(body);
    }

    fetchAllIntersting(id_menor) {
        return this.Adapter.fetchAllIntersting(id_menor);
    }

    removeIntersting(body) {
        return this.Adapter.removeIntersting();
    }

    createImage(body) {
        return this.Adapter.createImage();
    }

    fetchImages(body) {
        return this.Adapter.fetchAllImage();
    }

    fetchImage(body) {
        return this.Adapter.fetchImage();
    }

    removeImage(body) {
        return this.Adapter.removeImage();
    }

    createVideo(body) {
        return this.Adapter.createVideo();
    }

    fetchAllVideo(body) {
        return this.Adapter.fetchAllVideo();
    }

    fetchVideo(body) {
        return this.Adapter.fetchVideo();
    }

    removeVideo(body) {
        return this.Adapter.removeVideo();
    }

    validateToken(body) {
        return new Promise((resolve, reject) => {
            resolve(body);
        });
    }

    validate(body) {
        const schema = Joi.object({
            nome: Joi.string().required(),
            sexo: Joi.string().required().regex(/M|F/),
            dataNascimento: Joi.date().required().max("now").min(new Date().setFullYear(new Date().getFullYear() - 18)), //somar data atual + 18 anos
            etnia: Joi.string().required(),
            certidaoNascimento: Joi.string().required(),
            familyReferences: Joi.object(),
            saudavel: Joi.boolean().required(),
            descricaoSaude: Joi.string().required(),
            curavel: Joi.boolean().required(),
            deficienciaFisica: Joi.boolean().required(),
            deficienciaMental: Joi.boolean().required(),
            guiaAcolhimento: Joi.string().required(),
            refCidade: Joi.string().required(),
            refAbrigo: Joi.string().required(),
            processoPoderFamiliar: Joi.string().required(),
            ativo: Joi.boolean().required()
        });

        const {
            error,
            value
        } = Joi.validate(body, schema);

        return new Promise((resolve, reject) => {
            if (error) {
                let messages = error.details.map(e => e.message);
                reject({
                    status: 400,
                    messages
                });
            } else if (value) {
                resolve(value);
            }
        });

    }

}