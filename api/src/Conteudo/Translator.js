"use strict";

export default class Translator {
	constructor(deps = {}) {
		this.Interactor = deps.Interactor ? new deps.Interactor() : new(require("./Interactor").default)();
	}

	post(request, response) {
		const {
			body
		} = request;

		this.Interactor.create(body)
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
	
}