"use strict";

import mongoose from "mongoose";
import MoongoseHelper from "../Common/MoongoseHelper";

export default class Adapter {
    constructor(deps = {}) {
        this.Interessado = mongoose.model("Interessado");
        this.Interesse = mongoose.model("Interesse");
        this.Menor = mongoose.model("Menor");
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
        return this.Interesse
            .remove({
                refInteressado: mongoose.Types.ObjectId(interessadoId),
                refMenor: mongoose.Types.ObjectId(menorId)
            })
            .then(ret => {
                return ret.result.n > 0;
            });
    }

    // #94 RFI14: GET /interessados/{id_interessado}/menores
    fetchAllTypeInterest(id) {
        return MoongoseHelper.aggregate(this.Menor, [
            {
                $lookup: {
                    from: "interesses",
                    localField: "_id",
                    foreignField: "refMenor",
                    as: "interesse"
                }
            },
            { $match: { "interesse.refInteressado": mongoose.Types.ObjectId(id) } },
            {
                $lookup: {
                    from: "midias",
                    localField: "refMidias",
                    foreignField: "_id",
                    as: "midias"
                }
            },
            {
                $project: {
                    interesse: 0,
                    "midias.conteudo": 0
                }
            }
        ]);
    }

    // #94 RFI14: GET /interessados/{id_interessado}/menores?tipo=favorito|apadrinhamento|adocao
    fetchAllTypeInterestFiltered(id, type) {
        return MoongoseHelper.aggregate(this.Menor, [
            {
                $lookup: {
                    from: "interesses",
                    localField: "_id",
                    foreignField: "refMenor",
                    as: "interesse"
                }
            },
            { $match: { "interesse.refInteressado": mongoose.Types.ObjectId(id) } },
            { $match: { "interesse.tipoInteresse": type } },
            {
                $lookup: {
                    from: "midias",
                    localField: "refMidias",
                    foreignField: "_id",
                    as: "midias"
                }
            },
            {
                $project: {
                    interesse: 0,
                    "midias.conteudo": 0
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
