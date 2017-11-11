"use strict";

export default class Interactor {
    constructor(deps = {}) {
        this.Entity = deps.Entity ? new deps.Entity() : new(require("./Entity").default)();
    }

    // ## INTERESSADOS ##
    post(body) {
        return this.Entity.post(body);
    }

    getInteressados(body) {
        return this.Entity.getInteressados();
    }

    getInteressado(body) {
        return this.Entity.getInteressado(body.id);
    }

    getInteressadoByUser(userId) {
        return this.Entity.getInteressadoByUser(userId);
    }

    deleteInteressado(id) {
        return this.Entity.deleteInteressado(id);
    }

    updateInteressado(body) {
        return this.Entity.updateInteressado(body);
    }

    postOrdenacao(body) {
        return this.Entity.validateOrdenacao(body)
            .then(ret => {
                return this.Entity.postOrdenacao(body);
            });
    }

    // ## INTERESSE ##
    postInterested(body) {
        //Adiciona a data junto com o "corpo" que veio do Translator
        body.timeStamp = Date.now();

        return this.Entity.postInterested(body);
    }

	//TODO: precisamos avisar o TJ quando o usuário remover o interesse.
    deleteInterested(_id) {
        return this.Entity.deleteInterested(_id);
    }

    // #94 RFI14: GET /interessados/{id_interessado}/menores?tipo=favorito|apadrinhamento|adocao
    fetchAllTypeInterest(id) {
        return this.Entity.fetchAllTypeInterest(id);
    }

	// #94 RFI14: GET /interessados/{id_interessado}/menores?tipo=favorito|apadrinhamento|adocao
    fetchAllTypeInterestFiltered(id, type) {
        return this.Entity.validateTypeInterest(type).then(type => {
            return this.Entity.fetchAllTypeInterestFiltered(id, type);
        })
    }

    deleteInterest(body) {
        return this.Entity
            .deleteInterest(body);
    }

    // ## DOCUMENTOS ##
    getDocuments(body) {
        return this.Entity.getDocuments(body.id);
    }

}
