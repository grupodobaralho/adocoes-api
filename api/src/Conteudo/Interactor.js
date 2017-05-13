export default class Interactor {
	constructor(deps = {}) {
		this.Entity = deps.Entity || require('./Entity').default
	}

	create(body) {
		const entity = new this.Entity()
		
		return entity.create(body)
	}

	fetchAll(body) {
		const entity = new this.Entity()

		return entity.validateToken(body)
			.then(body => {
				entity.fetchAll()
			})
	}
	
	update(body){

		const entity = new this.Entity()
		
		return entity.update(body)	

	}

	remove(body){

		const entity = new this.Entity()
		
		return entity.remove(body)	

	}

	getImage(body){

		const entity = new this.Entity()
		
		return entity.getImagem(body)	

	}
}