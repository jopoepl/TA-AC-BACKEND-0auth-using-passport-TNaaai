var mongoose = require(`mongoose`)
var Schema = mongoose.Schema;
var bcrypt = require(`bcrypt`)



var userSchema = new Schema({
    fname: {type: String, required: true},
    email: {type: String, unique: true},
    password: {type: String, minlength: 5},
    cart: [{type:Schema.Types.ObjectId, ref:"Product", default: []}],
    blocked: {type: Boolean, default: false}
})

userSchema.pre(`save`, function(next){
    console.log(this.password, this)
    if(this.password && this.isModified(`password`)){
    bcrypt.hash(this.password, 10, (err, hashed) => {
        if(err) return next(err)
        this.password = hashed;
       return next()
    })
    } else {
        next();
    }
})

userSchema.methods.verifyPassword = function(password, cb){
    bcrypt.compare(password, this.password, (err, result) => {
        return cb(err, result)
    })
}


// userSchema.method.fullName = function(fname, lname, cb){
//     var fullName = this.fname + ` ` + this.lname;
//     return cb(err, fullName)
// }


module.exports = mongoose.model(`User`, userSchema)
