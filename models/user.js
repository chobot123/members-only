var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var UserSchema = new Schema({

    first_name: {
                    type: String,
                    required: true,
                    minLength: 1,
                    maxLength: 20,
                },

    last_name: {
                    type: String,
                    required: true,
                    minLength: 1,
                    maxLength: 20,
               },

    username: {
                    type: String, 
                    required: true,
                    minLength: 4,
                    maxLength: 20,
              },
    
    password: {
                    type: String,
                    minLength: 8,
                    maxLength: 20,
              },
    
    member: { type: Boolean, default: false},

    admin: { type: Boolean, default: false},

})

UserSchema
.virtual('name')
.get(function() {
    var fullname = '';
    if(this.first_name && this.last_name){
        fullname = this.first_name + ' ' + this.last_name;
    }
    return fullname;
})

UserSchema
.virtual('url')
.get(function(){
    return '/user/' + this._id;
})


//compile model from the schema
module.exports = mongoose.model('User', UserSchema);