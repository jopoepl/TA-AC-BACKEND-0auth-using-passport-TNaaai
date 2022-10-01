var mongoose = require(`mongoose`)
var Schema = mongoose.Schema;
var bcrypt = require(`bcrypt`)


var userSchema = new Schema({
    name: {type: String, required: true},
    username: {type: String, required: true},
    photo: {type: String}
})


module.exports = mongoose.model(`User`, userSchema)

