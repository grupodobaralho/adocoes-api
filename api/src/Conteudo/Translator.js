"use strict";

import fs from 'fs';

export default class Translator {
	constructor(deps = {}) {
		this.Interactor = deps.Interactor ? new deps.Interactor() : new (require("./Interactor").default)();
	}

	postContent(request, response) {
		const {
			body
		} = request;

		this.Interactor.createContent(body)
			.then(message => {
				response.send(200, message);
			})
			.catch(error => {
				response.send(500, error);
			});
	}

	updateContent(request, response) {
		const { body } = request;

		this.Interactor.updateContent(request.params.id_conteudo, body)
			.then(conteudo => {
				if (!conteudo) {
					return response.send(400, "Nenhum conteúdo com o ID informado foi encontrado");
				}
				response.send(200, conteudo);
			})
			.catch(error => {
				console.log(error);
				response.send(500, "Ocorreu um erro ao atualizar o conteúdo");
			});
	}

	getAllContent(request, response) {
		return this.Interactor.fetchAll()
			.then(result => {
				response.json(200, result);
			})
			.catch(error => {
				let status = error.status || 500;
				response.json(status, error);
			});
	}

	deleteContentById(request, response) {
		const { id_conteudo } = request.params;

		this.Interactor.deleteContentById(id_conteudo)
			.then(sucesso => {
				if (!sucesso) {
					return response.send(400, "Nenhum conteúdo com o ID informado foi encontrado");
				}
				response.send(200, "Conteúdo deletado com sucesso");
			})
			.catch(error => {
				console.log(error);
				response.send(500, "Ocorreu um erro ao deletar o conteúdo");
			});
	}

	fetchAllContentMedias(request, response) {
		const { id_conteudo } = request.params;

		return this.Interactor.fetchAllContentMedias(id_conteudo)
			.then(result => {
				response.json(200, result);
			})
			.catch(error => {
				let status = error.status || 500;
				response.json(status, error);
			});
	}

	fetchContentMediaById(request, response) {
		const { id_conteudo, id_midia } = request.params;

		return this.Interactor.fetchContentMediaById(id_midia)
			.then(result => {
				response.json(200, result);
			})
			.catch(error => {
				let status = error.status || 500;
				response.json(status, error);
			});
	}

	postConteudoMidia(request, response) {

		const { id_conteudo } = request.params;
		const { body } = request;

		this.Interactor.postConteudoMidia(body, id_conteudo)
			.then(sucesso => {
				if (!sucesso) {
					response.send(400, "Nenhum cadastro com o ID informado foi encontrado");
				}
				response.send(200, "Item cadastrado com sucesso");
			})
			.catch(error => {
				response.send(500, "Ocorreu um erro durante o cadastro do item");
			});
	}

	deleteMediaByContent(request, response) {

		const { id_conteudo } = request.params;
		const { id_midia } = request.params;

		this.Interactor.deleteMediaByContent(id_conteudo, id_midia)
			.then(sucesso => {
				response.send(200, "Mídia deletada com sucesso");
			})
			.catch(error => {
				response.send(500, "Ocorreu um erro ao deletar a Mídia");
			});
	}

	getVideo(req, res) {
        const movieName = req.params.video;
        const movieFile = `./midias/${movieName}`;

        fs.stat(movieFile, (err, stats) => {
            if (err)
                return res.send(404);

            const { range } = req.headers;
            const { size } = stats;
            const start = Number((range || '').replace(/bytes/, '').split('-')[0]);
            const end = size - 1;
            const chunkSize = (end - start) + 1;

            res.set({
                'Content-Range': `bytes ${start}-${end}/${size}`,
                'Accept-Ranges': 'bytes',
                'Content-Length': chunkSize,
                'Content-Type': 'video/mp4'
            });

            res.status(206);

            const stream = fs.createReadStream(movieFile, { start, end });

            stream.on('open', () => stream.pipe(res));
            stream.on('error', (streamErr) => res.end(streamErr));

        })
	}
}