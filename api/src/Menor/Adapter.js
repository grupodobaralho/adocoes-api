"use strict";

import mongoose from "mongoose";

export default class Adapter {

    constructor(deps = {}) {
        this.Menor = mongoose.model("Menor");
        this.Interesse = mongoose.model("Interesse");
        this.Midia = mongoose.model("Midia");
    }

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

    /*
     * @param shouldRenderAllMedias boolean. Determina se todas as mídias do menor devem ser enviadas ou somente as anônimas
     */
    fetchAll(shouldRenderAllMedias) {
        return this.cursorMenoresAggregatingMedias(shouldRenderAllMedias);
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

        return this.cursorMenoresAggregatingMedias(shouldRenderAllMedias, aggregatePipepline);
    }

    cursorMenoresAggregatingMedias(shouldRenderAllMedias, aggregatePipepline = []) {
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


        return new Promise((resolve, rej) => {
            let data = [];

            this.Menor
                .aggregate(aggregatePipepline)
                .cursor()
                .exec()
                .on("data", (doc) => { 
                    data.push(doc); 
                })
                .on("end", () => { 
                    resolve(data) 
                });
        });
    }

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


        return new Promise((resolve, rej) => {
            let data = [];

            this.Midia
                .aggregate(aggregatePipepline)
                .cursor()
                .exec()
                .on("data", (doc) => { 
                    data.push(doc); 
                })
                .on("end", () => { 
                    resolve(data) 
                });
        });
    }

    fetchMediaById(id) {
        return this.Midia.findById(id);
    }

    saveMedia(body, id_menor) {
        const media = new this.Midia(body);

        media.save();

        this.Menor.findById(id_menor, (err, menor) => {   
            menor.refMidias.push(media._id);
            menor.save();
        });

        return {};                
}

    update(id, body) {
        return this.Menor.findOneAndUpdate({
			_id: id
		}, body, {
			upsert: false,
			new: true
		});
    }

    fetchOrdination() {

    }

    postInterested(body) {
        const interesse = new this.Interesse(body);
        return interesse.save();
    }

    fetchAllIntersting(id_menor) {

        return this.Interesse.aggregate([

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
        ])
    }

    removeIntersting() {

    }

    createImage() {

    }

    fetchAllImage() {

    }

    fetchImage() {

    }

    removeImage() {

    }

    createVideo() {

    }

    fetchAllVideo() {

    }

    fetchVideo() {

    }

    removeVideo() {

    }

}