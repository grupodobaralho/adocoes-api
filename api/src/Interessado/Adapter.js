"use strict";

import mongoose from "mongoose";
import MoongoseHelper from "../Common/MoongoseHelper";

export default class Adapter {
	constructor(deps = {}) {
		this.Interessado = mongoose.model("Interessado");
		this.Interesse = mongoose.model("Interesse");
	}

	post(body) {
		console.log(body);
		const interessado = new this.Interessado(body);
		return interessado.save();
	}

	getInteressado(id) {
		console.log(id);
		return this.Interessado.findById(id, (err, result) => {
			return new Promise((resolve, reject) => {
				resolve(result);
			})
		});
	}

	getInteressados() {
		return this.Interessado.find((err, doc) => {
			return new Promise((resolve, reject) => {
				resolve(doc);
			});
		});
	}

	deleteInterassado(id) {
		return this.Interessado.remove({
			_id: id
		});
	}

	updateInteressado(body) {
		return this.Interessado.findOneAndUpdate({
			_id: body.id
		}, {
			upsert: true,
			new: true
		}, body);
	}

	//
	// Menores
	//

	// #94 RFI14: GET /interessados/{id_interessado}/menores?tipo=favorito|apadrinhamento|adocao
	fetchAllTypeInterest(id) {
    return MoongoseHelper.aggregate(this.Interesse, [
      { $match: { refInteressado: mongoose.Types.ObjectId(id) } },
      {
        $lookup: {
          from: "menors",
          localField: "refMenor",
          foreignField: "_id",
          as: "menores"
        }
      },
      {
        $project: {
            _id: 0,
          menores: 1
        }
      }
    ]);
  }

	// #94 RFI14: GET /interessados/{id_interessado}/menores?tipo=favorito|apadrinhamento|adocao
  fetchAllTypeInterestFiltered(id, type) {
		return MoongoseHelper.aggregate(this.Interesse, [
			{ $match: { refInteressado: mongoose.Types.ObjectId(id) } },
			{ $match: { tipoInteresse: type } },
      {
        $lookup: {
          from: "menors",
          localField: "refMenor",
          foreignField: "_id",
          as: "menores"
        }
      },
      {
        $project: {
            _id: 0,
          menores: 1
        }
      }
    ]);
  }

	addInsert() {}

	fetchAllMenores() {}

	putMenores() {}

	//
	// Visualizacoes
	//

	// RFI09: POST /interessados/{id_interessado}/visualizacoes
	updateVisualizacao(body) {
		return this.Interessado.findOneAndUpdate({
			_id: body.id
		}, {
			$pushAll: {
				"visualizacoes": body.visualizacoes
			}
		}, {
			upsert: true,
			new: true
		});
	}

	fetchAllViews() {}

	insertInterest() {}

	fetchAllInterest() {}

	deleteInterest() {}

	getDocuments(id) {
		return this.Interessado.findById(id).select('outrosDocumentos')
			.then((result, err) => {
				return { documentos: result.outrosDocumentos }
			});
	}

}
