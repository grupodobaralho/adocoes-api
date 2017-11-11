"use strict";

import mongoose from "mongoose";
import MoongoseHelper from "../Common/MoongoseHelper";

export default class Adapter {
    constructor(deps = {}) {
        this.Interessado = mongoose.model("Interessado");
        this.Interesse = mongoose.model("Interesse");
    }

    // ## INTERESSADOS ##
    post(body) {
        const interessado = new this.Interessado(body);
        return interessado.save();
    }

    getInteressado(id) {
        return this.Interessado.findById(id, (err, result) => {
            return new Promise((resolve, reject) => {
                resolve(result);
            })
        });
    }

    getInteressadoByUser(userId) {
        return this.Interessado.findOne({
            refUsuario: mongoose.Types.ObjectId(userId)
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

    postOrdenacao(body) {
        return this.Interessado.findOneAndUpdate({
            _id: mongoose.Types.ObjectId(body.id)
        }, body);
    }

    // ## INTERESSE ##
    postInterested(body) {
        const interesse = new this.Interesse(body);
        return interesse.save();
    }

    deleteInterested(_id) {
        return this.Interesse
            .remove({
                _id
            })
            .then(ret => {
                return ret.result.n > 0;
            });
    }

    deleteInterestInMenor(interessadoId, menorId) {
        console.log(interessadoId);
        console.log(menorId);

        return this.Interesse
            .remove({
                refInteressado: mongoose.Types.ObjectId(interessadoId),
                refMenor: mongoose.Types.ObjectId(menorId)
            })
            .then(ret => {
                return ret.result.n > 0;
            });
    }

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

    // ## VISUALIZAÇÕES ##
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

    // ## DOCUMENTOS ##
    getDocuments(id) {
        return this.Interessado.findById(id).select('outrosDocumentos')
            .then((result, err) => {
                return { documentos: result.outrosDocumentos }
            });
    }

}
