import mongoose from 'mongoose'

export default class Adapter {
	constructor(deps = {}) {
		this.Usuario = mongoose.model('Usuario')
	}

	save(body) {
		console.log(body)
		const usuario = new this.usuario(body)

		return usuario.save()
	}	

	fetchAll() {
		return this.Usuario.find()
	}

	findById(id) {
		return this.Usuario.findById(id)
	}

	update(id, body) {
		return this.Usuario.findById(id)
			.then(usuario => {
				if (body.email)
					usuario.email = body.email;

				if (body.senha)
					usuario.senha = body.senha;

				if (body.nome)
					usuario.nome = body.nome;

				if (body.perfis)
					usuario.perfis = body.perfis;

				if (body.refPerfilAdministrador)
					usuario.refPerfilAdministrador = body.refPerfilAdministrador;

				if (body.refPerfilInteressado)
					usuario.refPerfilInteressado = body.refPerfilInteressado;

				if (body.ativo)
					usuario.ativo = body.ativo;

				return usuario.save(); 
			})
	}		

	delete(_id) {
		return this.Usuario.remove({ _id })
			.then(resultado => { return resultado.result.n > 0 })
	}
}