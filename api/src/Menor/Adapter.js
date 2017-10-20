"use strict";

import mongoose from "mongoose";
import MoongoseHelper from "../Common/MoongoseHelper";

export default class Adapter {
    constructor(deps = {}) {
        this.Menor = mongoose.model("Menor");
        this.Interesse = mongoose.model("Interesse");
        this.Midia = mongoose.model("Midia");
    }

    // ## MENORES ##
    save(body) {
        const menor = new this.Menor(body);
        return menor.save();
    }

    delete(_id) {
        return this.Menor.remove({
            _id
        })
            .then(resultado => {
                return resultado.result.n > 0;
            });
    }

    update(id, body) {
        return this.Menor.findOneAndUpdate({
            _id: id
        }, body, {
            upsert: false,
            new: true
        });
    }

    /*
     * @param shouldRenderAllMedias boolean. Determina se todas as mídias do menor devem ser enviadas ou somente as anônimas
     */
    fetchAll(shouldRenderAllMedias) {
        return this._cursorMenoresAggregatingMedias(shouldRenderAllMedias);
    }

    /*
     * @param shouldRenderAllMedias boolean. Determina se todas as mídias do menor devem ser enviadas ou somente as anônimas
     */
    fetchById(id, shouldRenderAllMedias) {
        //Busca pelo ID
        let aggregatePipepline = [{
            $match: {
                "_id": mongoose.Types.ObjectId(id)
            }
        }];

        return this._cursorMenoresAggregatingMedias(shouldRenderAllMedias, aggregatePipepline, true);
    }

    _cursorMenoresAggregatingMedias(shouldRenderAllMedias, aggregatePipepline = [], isSingleRecord = false) {
        //Faz o "inner join" com o documento de mídias
        aggregatePipepline.push({
            $lookup: {
                from: "midias",
                localField: "refMidias",
                foreignField: "_id",
                as: "midias"
            }
        });

        //Adiciona condição para retornar apenas mídias anônimas
        if (!shouldRenderAllMedias)
            aggregatePipepline.push({
                $addFields: { 
                    "midias": {
                        "$filter": {
                            "input": "$midias",
                            "as": "midia",
                            "cond": {
                                "$eq": ["$$midia.anonymous", true]
                            }
                        }
                    }
                }
            });

        //Remove o corpo da mídia
        aggregatePipepline.push({
            $project: { "midias.conteudo": 0 }
        });

        return MoongoseHelper.aggregate(this.Menor, aggregatePipepline, isSingleRecord);
    }

    // ## MEDIAS ## 
    fetchMediaByIdWithoutBody(id) {
        let objectId = mongoose.Types.ObjectId(id);

        return this.Midia.findById(objectId, '-conteudo');
    }

    /*
     * @param shouldRenderAllMedias boolean. Determina se todas as mídias do menor devem ser enviadas ou somente as anônimas
     */
    fetchAllMediasByMenor(id_menor, shouldRenderAllMedias) {
        let aggregatePipepline = [];

        if (!shouldRenderAllMedias)
            aggregatePipepline.push({
                $match: {
                    "anonymous": true
                }
            });

        //Faz o "inner join" com o documento de mídias
        aggregatePipepline.push({
            $lookup: {
                from: "menors",
                localField: "_id",
                foreignField: "refMidias",
                as: "menor"
            }
        });

        aggregatePipepline.push({
            $match: {
                "menor._id": mongoose.Types.ObjectId(id_menor)
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

    fetchMediaById(id) {
        return this.Midia.findById(id);
    }

    saveMedia(body, id_menor) {
        const media = new this.Midia(body);

        //save the media
        media.save();

        return this.Menor.update(
            { _id: id_menor },
            { $push: { refMidias: media._id } },
            { multi: false }
        ).then(result => {
            return {};
        });
    }

    deleteMediaById(id_menor, id_midia) {
        return this.Menor.update(
            { _id: id_menor },
            { $pull: { refMidias: id_midia } },
            { multi: false }
        ).then(resultado => {
            return resultado.nModified > 0
        });
    }

    // ## INTERESSES ##
    postInterested(body) {
        const interesse = new this.Interesse(body);
        return interesse.save();
    }
    
    deleteInterested(body) {
        return this.Interesse
            .remove({
                refMenor: body.refMenor,
                refInteressado: body.refInteressado
            })
            .then(ret => {
                return ret.result.n > 0;
            });
    }

    fetchAllIntersting(id_menor) {
        return MoongoseHelper.aggregate(this.Interesse, [
            { $match: { refMenor: mongoose.Types.ObjectId(id_menor) } },
            { $sort: { refInteressado: 1 } },
            {
                $lookup: {
                    from: "interessados",
                    localField: "refInteressado",
                    foreignField: "refUsuario",
                    as: "interessados"
                }
            }
        ]);
    }
}