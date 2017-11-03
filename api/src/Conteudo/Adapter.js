"use strict";

import mongoose from "mongoose";
import MoongoseHelper from "../Common/MoongoseHelper";

export default class Adapter {
	constructor(deps = {}) {
		this.Conteudo = mongoose.model("Conteudo");
		this.Midia = mongoose.model("Midia");
	}

	save(body) {
		const conteudo = new this.Conteudo(body);

		return new Promise((resolve, reject) => {
			conteudo.save((err, result) => {
				if (err) {
					return reject(err);
				}
				return resolve(result);
			});
		});
	}

	fetchAll() {
		return this.Conteudo.find((err, doc) => {
			return new Promise((resolve, reject) => {
				resolve(doc);
			});
		});
	}

	updateContent(id_conteudo, body) {
		return this.Conteudo.findOneAndUpdate(
			{
				_id: id_conteudo
			},
			body,
			{
				upsert: false,
				new: true
			}
		);
	}

	/*fetchAllContentMedias(id_conteudo, id_midia) {
		return this.Conteudo.findById(id_conteudo, (err, content) => {
			return new Promise((resolve, reject) => {
				resolve(content)
			});
		}).then(doc => {
			return doc.midia
		})
	}*/

	fetchAllContentMedias(id_conteudo, shouldRenderAllMedias) {
    let aggregatePipepline = [];

    if (!shouldRenderAllMedias)
      aggregatePipepline.push({
        $match: {
          anonymous: true
        }
      });

    //Faz o "inner join" com o documento de mídias
    aggregatePipepline.push({
      $lookup: {
        from: "conteudos",
        localField: "_id",
        foreignField: "refMidias",
        as: "conteudo"
      }
    });

    aggregatePipepline.push({
      $match: {
        "conteudo._id": mongoose.Types.ObjectId(id_conteudo)
      }
    });

    //Habilitar somente os campos que serão úteis
    aggregatePipepline.push({
      $project: {
        type: 1,
        descricao: 1,
        principal: 1,
        anonymous: 1
      }
    });

    return MoongoseHelper.aggregate(this.Midia, aggregatePipepline);
  }

	fetchContentMediaById(id_midia) {
    return this.Midia.findById(id_midia);
  }

	deleteContentById(id_conteudo) {
		return this.Conteudo.remove({
			_id: id_conteudo
		})
			.then(resultado => {
				return resultado.result.n > 0;
			});
	}

	saveConteudoMidia(body, id_conteudo) {
		const media = this.Midia(body);

		media.save();

		return this.Conteudo.update(
			{ _id: id_conteudo },
			{ $push: { refMidias: media.id } },
			{ multi: false }
		).then(result => {
			return {};
		});
	}

	deleteMediaByContent(id_conteudo, id_midia) {
		return this.Conteudo.update(
			{ _id: id_conteudo },
			{ $pull: { refMidias: id_midia } },
			{ multi: false }
		).then(resultado => {
			return resultado.nModified > 0
		});
	}
}