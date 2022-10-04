var mongoose = require(`mongoose`)
var Schema = mongoose.Schema;

var categorySchema = new Schema({
    name: String, 
    products: [{type: Schema.Types.ObjectId, ref: "Product"}]
})

module.exports = mongoose.model(`Category`, categorySchema)
