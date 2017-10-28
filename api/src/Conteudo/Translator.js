"use strict";

export default class Translator {
	constructor(deps = {}) {
		this.Interactor = deps.Interactor ? new deps.Interactor() : new(require("./Interactor").default)();
	}

	postContent(request, response) {
		const {
			body
		} = request;

		console.log(body);
		this.Interactor.createContent(body)
			.then(message => {
				console.log("super gesiel");
				response.send(200, message);
			})
			.catch(error => {
				console.log("grande gesiel");
				console.log(500, error);
			});
	}

	getAllVideos(request, response) {
		const {
			id
		} = request.params;

		this.Interactor.fetchAllVideos(id)
			.then(message => {
				response.send(200, message);
			})
			.catch(error => {
				console.log(error);
			});
	}

	put(request, response) {
		const {
			body
		} = request;
		
		this.Interactor.update(body)
			.then(message => {
				response.send(200, message);
			});
	}

	get(request, response) {
		return this.Interactor.fetchAll()
			.then(result => {
				response.json(200, result);
			})
			.catch(error => {
				let status = error.status || 500;
				response.json(status, error);
			});
	}

	deleteVideo(request, response) {
		const {
			body
		} = request;
		this.Interactor.deleteVideo(body)
			.then(message => {
				console.log(200, message);
			})
			.catch(error => {
				console.log(error);
			});
	}

	delete(request, response) {
		let {
			body
		} = request;
		body.id = request.params.id;
		this.Interactor.remove(body)
			.then(message => {
				response.send(200, message);
			})
			.catch(error => {
				console.log(error);
			});
	}

	getImage(request, response) {
		let {
			body
		} = request;
		body.id = request.params.id;
		this.Interactor.getImage(body)
			.then(message => {})
			.catch(error => {
				console.log(error);
			});
	}

	postImages(request, response) {
		let {
			body
		} = request;
		body.id = request.params.id;
		this.Interactor.addImage(body)
			.then(message => {
				response.send(200, message);
			})
			.catch(error => {
				console.log(error);
			});
	}

	postVideo(request, response) {
		let {
			body
		} = request;
		body.id = request.params.id;
		this.Interactor.createVideo(body).then(message => {
			response.send(200, message);
		}).catch(error => {
			console.log(error);
		});
	}

	fetchAllImages(request, response) {
		
	}
	
}