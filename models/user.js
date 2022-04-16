var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var UserSchema = new Schema({

    first_name: {
                    type: String,
                    required=true,
                    minlength=1,
                    maxlength=20,
                },

    last_name: {
                    type: String,
                    required=true,
                    minlength=1,
                    maxlength=20,
               },

    username: {
                    type: String, 
                    required=true,
                    minlength=4,
                    maxlength=20,
              },
    
    password: {
                    type: String,
                    minlength=8,
                    maxlength=20,
              },
    
    member: { type: Boolean, default: false},

    admin: { type: Boolean, default: false},

})



//compile model from the schema
module.exports = mongoose.model('User', UserSchema);