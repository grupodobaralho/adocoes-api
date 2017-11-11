"use strict";
import Joi from "joi";

export default class Entity {
    constructor(deps = {}) {
        this.Adapter = deps.Adapter ? new deps.Adapter() : new(require("./Adapter").default)();
    }

    // ## INTERESSADOS ##
    post(body) {
        return this.Adapter.post(body);
    }

    getInteressados() {
        return this.Adapter.getInteressados();
    }

    getInteressado(id) {
        return this.Adapter.getInteressado(id);
    }

    getInteressadoByUser(userId) {
        return this.Adapter.getInteressadoByUser(userId);
    }

    postOrdenacao(body) {
        return this.Adapter.postOrdenacao(body);
    }

    deleteInteressado(id) {
        return this.Adapter.deleteInteressado(id);
    }

    updateInteressado(body) {
        return this.Adapter.postOrdenacao(body);
    }

    validateOrdenacao(body) {
        const schema = Joi.object({
            id: Joi.string().required(),
            pontoIdade: Joi.number().required().min(0).max(18),
            pontoSexo: Joi.number().required().min(0).max(1)
        });

        const { error, value } = Joi.validate(body, schema);
        return new Promise((resolve, reject) => {
            if (error) {
                let messages = error.details.map(e => e.message);
                reject({
                    status: 400,
                    messages
                });
            }
            else {
                resolve(value);
            }
        });
    }

    validate(body) {
        const schema = Joi.object({
            refUsuario: Joi.object().required(),
            name: Joi.string().required(),
            cpf: Joi.number().required(),
            email: Joi.string().required().email(),
            senha: Joi.string().required(),
            ativo: Joi.string().required(),
            nomeConjuge: Joi.string().required(),
            dataNascimento: Joi.date().required(),
            renda: Joi.number().precision(2),
            comprovantesRenda: Joi.object().required(),
            outrosDocumentos: Joi.object(),
            enderecos: Joi.string().required(),
            telefones: Joi.string().required(),
            interesses: Joi.object().required(),
            visualizacoes: Joi.object().required()
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

    // ## INTERESSE ##
    deleteInterested(_id) {
        return this.Adapter.deleteInterested(_id);
    }

    postInterested(body) {
        return this.Adapter.postInterested(body);
    }

    // #94 RFI14: GET /interessados/{id_interessado}/menores?tipo=favorito|apadrinhamento|adocao
    fetchAllTypeInterest(id) {
        return this.Adapter.fetchAllTypeInterest(id);
    }

    fetchAllTypeInterestFiltered(id, type) {
        return this.Adapter.fetchAllTypeInterestFiltered(id, type);
    }

	// #94 RFI14: GET /interessados/{id_interessado}/menores?tipo=favorito|apadrinhamento|adocao
    validateTypeInterest(type){
        const schema = Joi.object({
            type: Joi.string().required().regex(/adotar|apadrinhar|favoritar/)
        });

        const { error, value } = Joi.validate({type}, schema);

        return new Promise((resolve, reject) => {
            if (error) {
                let messages = error.details.map(e => e.message);
                reject({ status: 400, messages });
            }
            else if (value) {
                resolve(value.type);
            }
        });
    }

    // ## DOCUMENTOS ##
    getDocuments(id) {
        return this.Adapter.getDocuments(id);
    }

    validateDocument(body) {
        const schema = Joi.object({
            numero: Joi.string().required(),
            dataEmissao: Joi.date(),
            orgaoEmissor: Joi.string(),
            tipoDocumento: Joi.string().required()
        });
    }

}
