"use strict";

export default class Interactor {
    constructor(deps = {}) {
		this.Entity = deps.Entity || new(require("./Entity").default)();
    }

    create(body) {
        return this.Entity.validate(body).then(body => {
            return this.Entity.create(body);
        });
    }

    postMedia(body, id_menor) {
        return this.Entity.validateMedia(body, id_menor).then(body => {
            return this.Entity.postMedia(body, id_menor);
        });   
    }

    fetchMediaAnonymous(id_menor, id_media) {
        return this.Entity.fetchMediaAnonymous(id_media);
    }

    fetchMedia(id_menor, id_media) {
        return this.Entity.fetchMedia(id_media);
    }

    delete(id) {
        return this.Entity.delete(id);
    }

    fetchAllAnonymous() {
        return this.Entity.fetchAllAnonymous();
    }

    fetchAll() {
        return this.Entity.fetchAll();
    }

    fetchAllMediasAnonymous(id_menor) {
        return this.Entity.fetchAllMediasAnonymous(id_menor);
    }

    fetchAllMedias(id_menor) {
        return this.Entity.fetchAllMedias(id_menor);
    }

	fetchById(id) {
		return this.Entity.fetchById(id);
	}

    fetchByIdAnonymous(id) {
        return this.Entity.fetchByIdAnonymous(id);
    }

    remove(body) {
        return this.Entity.delete();
    }

    update(id, body) {
		return this.Entity.validate(body).then(body => {
            return this.Entity.update(id, body);
        });
    }

    postInterested(body) {
        //Adiciona a data junto com o "corpo" que veio do Translator
        body.timeStamp = Date.now();
        
        return this.Entity.postInterested(body);
    }

    //TODO: precisamos avisar o TJ quando o usuário remover o interesse.
    deleteInterested(body) {
        return this.Entity.deleteInterested(body);
    }

    fetchAllIntersting(id_menor) {
        return this.Entity.fetchAllIntersting(id_menor);
    }

}