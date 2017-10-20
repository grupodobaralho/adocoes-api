"use strict";

import Joi from "joi";
import StringHelper from "../Common/StringHelper";

export default class Entity {
    constructor(deps = {}) {
		this.Adapter = deps.Adapter || new(require("./Adapter").default)();

        this._createNewAnonymousDTO = this._createNewAnonymousDTO.bind(this);
    }

    // ## MENORES ##
    create(body) {
        return this.Adapter.save(body);
    }

    fetchAll() {
        return this.Adapter.fetchAll(true);
    }

    fetchAllMediasAnonymous(id_menor) {
        return this.Adapter.fetchAllMediasByMenor(id_menor, false);
    }

    fetchAllMedias(id_menor) {
        return this.Adapter.fetchAllMediasByMenor(id_menor, true);
    }

    fetchAllAnonymous() {
        //Retorna entidades do banco de dados
        return this.Adapter.fetchAll(false).then(body => {
            //Para cada entidade, reduzir a quantidade das informações
            return body.map(this._createNewAnonymousDTO);
        });
    }

    update(id, body) {
        return this.Adapter.update(id, body);
    }

    //Cria "DTO" com valores reduzidos
    _createNewAnonymousDTO(entity) {
        //Transforma nome em somente iniciais
        entity.nome = StringHelper.getOnlyNameInitials(entity.nome);

        return entity;
    }

    fetchById(id) {
        return this.Adapter.fetchById(id, true);
    }

    fetchByIdAnonymous(id) {
        return this.Adapter.fetchById(id, false).then(dto => {
            //Para cada entidade, reduzir a quantidade das informações
            return this._createNewAnonymousDTO(dto);
        });
    }

    delete(id) {
        return this.Adapter.delete(id);
    }

    // ## MEDIAS ##
    postMedia(body, id_menor) {
        return this.Adapter.saveMedia(body, id_menor);
    }

    fetchMediaAnonymous(id_media) {
        let media = this.fetchMedia(id_media);

        return media.then((body) => {
            if (this._isMediaAnonymous(body.anonymous))
                return media;
            else
                return null;
        });
    }

    fetchMedia(id_media) {
        return this.Adapter.fetchMediaById(id_media);
    }

    fetchMediaWithoutBody(id_media) {
        return this.Adapter.fetchMediaByIdWithoutBody(id_media);
    }

    fetchMediaWithoutBodyAnonymous(id_media) {
        let media = this.fetchMediaWithoutBody(id_media);

        return media.then((body) => {
            if (this._isMediaAnonymous(body.anonymous))
                return media;
            else
                return null;
        });
    }

    _isMediaAnonymous(anon) {
        return (anon !== undefined && anon === true);
    }

    // ## INTERESSES ##
    deleteInterested(body) {
        return this.Adapter.deleteInterested(body);
    }

    postInterested(body) {
        return this.Adapter.postInterested(body);
    }

    fetchAllIntersting(id_menor) {
        return this.Adapter.fetchAllIntersting(id_menor);
    }

    fetchAllInterstingFiltered(id, type) {
        return this.Adapter.fetchAllInterstingFiltered(id, type);
    }

    // ## JOI VALIDATIONS ##
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

    validateMedia(body, id_menor) {
        const schema = Joi.object({
            refMenor: id_menor,
            type: Joi.string().required(),
            conteudo: Joi.string(),
            descricao: Joi.string(),
            principal: Joi.boolean(),
            anonymous: Joi.boolean()
        });

        const { error, value } = Joi.validate(body, schema);

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