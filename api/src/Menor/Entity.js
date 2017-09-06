import Joi from 'Joi'

export default class Entity {
	constructor(deps = {}) {
		this.Adapter = deps.Adapter || require('./Adapter').default
	}

	create(body) {
		const adapter = new this.Adapter()
		console.log("Entity")
		return adapter.save(body)
	}

    save(menor) {
        return this.Adapter.save(menor)
    }

	fetchAll() {
		const adapter = new this.Adapter()
		return adapter.fetchAll()
	}
	
	fetchById(id) {
		const adapter = new this.Adapter()
		
		return adapter.fetchById(id)
	}

	find(body) {
		const adapter = new this.Adapter()
		
		return adapter.fetch(body.id)
	}
	
	remove(body) {
		const adapter = new this.Adapter()
		
		return adapter.delete(body.id)
	}
	
	update(body) {
		const adapter = new this.Adapter()
		
		return adapter.fetchAndUpdate(body)
	}
	
	getOrdination(body) {
		const adapter = new this.Adapter()
		
		return adapter.fetchOrdination()
	}
	
	addIntersting(body) {
		const adapter = new this.Adapter()
		
		return adapter.addIntersting()		
	}
	
	fetchAllIntersting(body) {
		const adapter = new this.Adapter()
		
		return adapter.fetchAllInstersting()
	}
	
	removeIntersting(body) {
		const adapter = new this.Adapter()
		
		return adapter.removeIntersting();		
	}
	
	createImage(body) {
		const adapter = new this.Adapter()
		
		return adapter.createImage();
	}
	
	fetchImages(body) {
		const adapter = new this.Adapter()
		
		return adapter.fetchAllImage();
	}
	
	fetchImage(body) {
		const adapter = new this.Adapter()
		
		return adapter.fetchImage();
	}
	
	removeImage(body) {
		const adapter = new this.Adapter()
		
		return adapter.removeImage();
	}
		
	createImage(body) {
		const adapter = new this.Adapter()
		
		return adapter.createImage();
	}
	
	createVideo(body) {
		const adapter = new this.Adapter()
		
		return adapter.createVideo();
	}
	
	fetchAllVideo(body) {
		const adapter = new this.Adapter()
		
		return adapter.fetchAllVideo();
	}
	
	fetchVideo(body) {
		const adapter = new this.Adapter()
		
		return adapter.fetchVideo();
	}
	
	removeVideo(body) {
		const adapter = new this.Adapter()
		
		return adapter.removeVideo()
		
	}
	

	validateToken(body) {
		return new Promise((resolve, reject) => {
			resolve(body)
		})
	}	
	
	validate(body) {
        console.log("Antes Validate")
		const schema = Joi.object({
			nome: Joi.string().required(),
			sexo: Joi.string().required().regex(/M|F/),
	        dataNascimento: Joi.date().required().max('now'),
	        
	        refEtnia: Joi.object().required(),
	        certidaoNascimento: Joi.string().required(),
	        familyReferences: Joi.object(),
	       // menoresVinculados: Joi.object().required(),
	      //  adocoesConjuntas: Joi.object().required(),
	        saudavel: Joi.boolean().required(),
	        descricaoSaude: Joi.string().required(),
	        curavel: Joi.boolean().required(),
	        deficienciaFisica: Joi.boolean().required(),
	        deficienciaMental: Joi.boolean().required(),
	        guiaAcolhimento: Joi.string().required(),
	        refCidade: Joi.object().required(),
	        refAbrigo: Joi.string().required(),
	        processoPoderFamiliar: Joi.string().required(),
	      //  interesses: Joi.string().required(),
	       // visualizacoes: Joi.string().required(),
	        ativo: Joi.boolean().required()

	    })

		const {error, value} = Joi.validate(body, schema)
        console.log("Pos validate")
		return new Promise((resolve, reject) => {

            if(error) {
                let messages = error.details.map(e => e.message + "xxxxxx")
                reject({
                    status: 400,

                    messages
                })


            } else if(value) {
                resolve(value)
            }
        })
	}
}