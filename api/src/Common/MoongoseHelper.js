export default class MoongoseHelper {

    /*
     * @param schema MoongoseSchema | Moongose schema
     * @param pipeline Array | Lista de pipelines para utilizar no `aggregate`
     */
    static aggregateMany(schema, pipeline) {
        return new Promise((resolve, reject) => {
            let data = [];

            schema
                .aggregate(pipeline)
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

    /*
     * @param schema MoongoseSchema | Moongose schema
     * @param pipeline Array | Lista de pipelines para utilizar no `aggregate`
     */
    static aggregateOne(schema, pipeline) {
        return new Promise((resolve, reject) => {
            let data = null;

            schema
                .aggregate(pipeline)
                .cursor()
                .exec()
                .on("data", (doc) => {
                    data = doc;
                })
                .on("end", () => {
                    resolve(data)
                });
        });
    }

    /*
     * @param schema MoongoseSchema | Moongose schema
     * @param pipeline Array | Lista de pipelines para utilizar no `aggregate`
     */
    static aggregate(schema, pipeline, isSingleRecord = false) {
        let aggregateFunction = isSingleRecord ?
            this.aggregateOne :
            this.aggregateMany;

        return aggregateFunction(schema, pipeline);
    }
}