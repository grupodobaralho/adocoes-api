export default class Translator {
	constructor(deps = {}) {
		this.Interactor = deps.Interactor || require('./Interactor').default
       // this.Interactor = deps.Interactor ? new deps.Interactor() : new (require('./Interactor').default)()
	}

	post(request, response) {
		const { body } = request

        const interactor = new this.Interactor()

        interactor.create(body)
            .then(message => {
                response.send(200, message )
            })
            .catch(error => {
                response.send(500, error + " ocorreu um erro ao criar o menor - Translator")
            })
	}


	get(request, response) {
		const { body } = request
	
		const interactor = new this.Interactor()

		interactor.fetchAll()
			.then(message => {
                response.send(200, message)
            })
            .catch(error => {
                console.log(error)
            })
	}

	getMenor(request, response) {
		const { id } = request.params
	
		const interactor = new this.Interactor()

		interactor.fetchById(id)
			.then(message => {
                response.send(200, message)
            })
            .catch(error => {
                console.log(error)
            })
	}

	put() {}
	delete() {}
}