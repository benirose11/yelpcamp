const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose')


const UserSchema = new Schema ({
    email:{
        type: String,
        required: true,
        unique: true
    }

});

UserSchema.plugin(passportLocalMongoose);


module.exports = mongoose.model('User', UserSchema);



// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;
// const passportLocalMongoose = require('passport-local-mongoose');

// const User = new Schema({
//     email:{
//     type: String,
//     required: true,
//     unique: true}
// });

// User.plugin(passportLocalMongoose);

// module.exports = mongoose.model('User', User);