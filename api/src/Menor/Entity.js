"use strict";

import Joi from "Joi";

export default class Entity {
    constructor(deps = {}) {
        this.Adapter = deps.Adapter || require("./Adapter").default;
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

    fetchById(id) {
        const adapter = new this.Adapter();
        return adapter.fetchById(id);
    }

	validateToken(body) {
		return new Promise((resolve, reject) => {
			resolve(body)
		})
	}	
	
	validate(body) {

		const schema = Joi.object({
			nome: Joi.string().required(),
			sexo: Joi.string().required().regex(/M|F/),
	        dataNascimento: Joi.date().required().max('now').min('now'), //somar data atual + 18 anos
	        
	        refEtnia: Joi.object().required(),
	        certidaoNascimento: Joi.string().required(),
	        familyReferences: Joi.object(),
	        menoresVinculados: Joi.object().required(),
	        adocoesConjuntas: Joi.object().required(),
	        saudavel: Joi.boolean().required(),
	        descricaoSaude: Joi.string().required(),
	        curavel: Joi.boolean().required(),
	        deficienciaFisica: Joi.boolean().required(),
	        deficienciaMental: Joi.boolean().required(),
	        guiaAcolhimento: Joi.string().required(),
	        refCidade: Joi.string().required(),
	        refAbrigo: Joi.string().required(),
	        processoPoderFamiliar: Joi.string().required(),
	        interesses: Joi.string().required(),
	        visualizacoes: Joi.string().required(),
	        ativo: Joi.boolean().required()
	    })
		
		const {error, value} = Joi.validate(body, schema)

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