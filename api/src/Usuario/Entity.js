"use strict";

import Joi from "joi";

export default class Entity {
	constructor(deps = {}) {
		this.Adapter = deps.Adapter ? new deps.Adapter() : new (require("./Adapter").default)();
	}

	save(body) {
		if (this.validaCPF(body.cpf))
			return this.Adapter.save(body);
		else
			return new Promise((resolve, reject) => {
				resolve("CPF Inválido!");
			});
	}

	fetchAll() {
		return this.Adapter.fetchAll();
	}

	findById(id) {
		return this.Adapter.findById(id);
	}

	update(id, body) {
		if (this.validaCPF(body.cpf))
		return this.Adapter.update(id, body);
	else
		return new Promise((resolve, reject) => {
			resolve("CPF Inválido!");
		});		
	}

	delete(id) {
		return this.Adapter.delete(id);
	}

	getPerfilByUsuarioId(id) {
		return this.Adapter.getPerfilByUsuarioId(id);
	}

	updatePerfilUsuario(id, perfis) {
		return this.Adapter.updatePerfilUsuario(id, perfis);
	}

	validaCPF(cpf) {
		cpf = cpf.replace(/[^\d]+/g, "");
		if (cpf === "") {
			return false;
		}
		// Elimina CPFs invalidos conhecidos    
		if (cpf.length !== 11 ||
			cpf === "00000000000" ||
			cpf === "11111111111" ||
			cpf === "22222222222" ||
			cpf === "33333333333" ||
			cpf === "44444444444" ||
			cpf === "55555555555" ||
			cpf === "66666666666" ||
			cpf === "77777777777" ||
			cpf === "88888888888" ||
			cpf === "99999999999") {
			return false;
		}
		var add = 0;
		var i = 0;
		// Valida 1o digito 
		for (i = 0; i < 9; i++) {
			add += parseInt(cpf.charAt(i)) * (10 - i);
		}
		var rev = 11 - (add % 11);
		if (rev === 10 || rev === 11) {
			rev = 0;
		}
		if (rev !== parseInt(cpf.charAt(9))) {
			return false;
		}
		// Valida 2o digito 
		add = 0;
		for (i = 0; i < 10; i++) {
			add += parseInt(cpf.charAt(i)) * (11 - i);
		}
		rev = 11 - (add % 11);
		if (rev === 10 || rev === 11) {
			rev = 0;
		}
		if (rev !== parseInt(cpf.charAt(10))) {
			return false;
		}
		return true;
	};

	validate(body) {
		const schema = Joi.object({
			email: Joi.string().required().email(),
			senha: Joi.string().required().min(5),
			nome: Joi.string().required(),
			cpf: Joi.string().required(),
			ativo: Joi.boolean().required(),
			perfis: Joi.string().required().regex(/Usuario|Master|Administrador|Interessado/)
		});

		const {
			error,
			value
		} = Joi.validate(body, schema);

		return new Promise((resolve, reject) => {
			if (error) {
				let messages = error.details.map(e => e.message);
				reject({
					status: 400,
					messages
				});
			} else if (value) {
				resolve(value);
			}
		});
	}


}