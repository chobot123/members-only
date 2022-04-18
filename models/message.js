var mongoose = require('mongoose');
const { DateTime } = require('luxon');

var Schema = mongoose.Schema;

var MessageSchema = new Schema({

    user: { 
                type: Schema.Types.ObjectId, 
                ref: 'User',
                required: true,
          },
    
    title: {
                type: String,
                minLength: 1,
                maxLength: 35,
                required: true,
           },
    text: {
                type: String,
                maxLength: 5000,
                required: true,
          },
    
    timestamp: {
                    type: Date,
                    default: Date.now(),
                    required: true,
               }
})

MessageSchema
.virtual('date')
.get(function(){
      return DateTime.fromJSDate(this.timestamp).toFormat('yyyy-mm-dd @ hh:mm');
})

module.exports = mongoose.model("Message", MessageSchema);