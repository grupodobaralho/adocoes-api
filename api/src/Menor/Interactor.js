"use strict";

export default class Interactor {
    constructor(deps = {}) {
		this.Entity = deps.Entity || new(require("./Entity").default)();
    }

    // ## MENORES ##
    create(body) {
        return this.Entity.validate(body).then(body => {
            return this.Entity.create(body);
        });
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

    fetchById(id) {
        return this.Entity.fetchById(id);
    }

    fetchByIdAnonymous(id) {
        return this.Entity.fetchByIdAnonymous(id);
    }

    update(id, body) {
        return this.Entity.validate(body).then(body => {
            return this.Entity.update(id, body);
        });
    }

    // ## MEDIAS ##
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

    fetchAllMedias(id_menor) {
        return this.Entity.fetchAllMedias(id_menor);
    }

    deleteMediaById(id_menor, id_midia) {
        return this.Entity.deleteMediaById(id_menor, id_midia);
    }

    // ## INTERESSES ##
    postInterested(body) {
        //Adiciona a data junto com o "corpo" que veio do Translator
        body.timeStamp = Date.now();
        
        return this.Entity.postInterested(body);
    }

    //TODO: precisamos avisar o TJ quando o usuário remover o interesse.
    deleteInterested(_id) {
        return this.Entity.deleteInterested(_id);
    }

	fetchAllTypeInterest(id) {
		return this.Entity.fetchAllTypeInterest(id);
}

fetchAllTypeInterestFiltered(id, type) {	
		return this.Entity.validateTypeInterest(type).then(type => {
			return this.Entity.fetchAllTypeInterestFiltered(id, type);
		})		
}

}