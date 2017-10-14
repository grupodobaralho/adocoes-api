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
        return this.Entity.fetchMediaAnonymous(id_menor, id_media);
    }

    fetchMedia(id_menor, id_media) {
        return this.Entity.fetchMedia(id_menor, id_media);
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

	find(body) {
		return this.Entity.fetch();
	}

    find(body) {
        return this.Entity.fetch();
    }

    remove(body) {
        return this.Entity.delete();
    }

    update(id, body) {
		return this.Entity.validate(body).then(body => {
            return this.Entity.update(id, body);
    })
}

    getOrdination(body) {
        return this.Entity.fetchOrdination();
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

    removeIntersting(body) {
        return this.Entity.removeIntersting();
    }

    createImage(body) {
        return this.Entity.createImage(body);
    }

    fetchImages(body) {
        return this.Entity.fetchAllImages(body);
    }

    fetchImage(body) {
        return this.Entity.fetchImage(body);
    }

    removeImage(body) {
        return this.Entity.removeImage();
    }

    createVideo(body) {
        return this.Entity.createVideo();
    }

    fetchAllVideo(body) {
        return this.Entity.fetchAllVideo();
    }

    fetchVideo(body) {
        return this.Entity.fetchVideo();
    }

    removeVideo(body) {
        return this.Entity.removeVideo();
    }

}