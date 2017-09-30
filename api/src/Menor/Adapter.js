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

    fetchAll() {
        return this.Menor.find((err, doc) => {
            return new Promise((resolve, reject) => {
                resolve(doc);
            });
        });
    }

    fetchById(id) {
        return this.Menor.findById(id);
    }

    saveMedia(body, id_menor) {
        const media = new this.Midia(body);
        media.save();
        this.Menor.findById(id_menor, (err, menor) => {   
        menor.refMidias.push(media._id);
        menor.save();
        console.log(menor.refMidias);
    });
        return media;                
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
    };

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