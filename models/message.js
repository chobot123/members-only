var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var MessageSchema = new Schema({

    User: { 
                Type: Schema.Types.ObjectId, 
                ref='User',
                required=true,
          },
    
    title: {
                Type: String,
                minlength=1,
                maxlength=35,
                required=true,
           },
    text: {
                Type: String,
                maxlength=5000,
                required=true,
          },
    
    timestamp: {
                    Type: Date,
                    default: Date.now(),
                    required=true,
               }
})

module.exports = mongoose.model("Message", MessageSchema);