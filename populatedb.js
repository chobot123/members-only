var userArgs = process.argv.slice(2);

var async = require('async');
//models
var User = require('./models/user');
var Message = require('./models/message');

var mongoose = require('mongoose');
var mongoDB = userArgs[0];
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var users = [];
var messages = [];

function userCreate(first_name, last_name,
                    username, password, member, admin, cb){
    
    userDetail = {
                    first_name: first_name,
                    last_name: last_name,
                    username: username,
                    password: password,
                    member: member,
                    admin: admin,
                };
    
    const user = new User(userDetail);

    user.save(function(err){
        if(err){
            cb(err, null);
            return;
        }
        users.push(user);
        cb(null, user);
    });
}

function messageCreate(user, title, text, timestamp, cb){
    messageDetail = {
                        user: user,
                        title: title,
                        text: text,
                        timestamp: timestamp,
                };
    
    let message = new Message(messageDetail);

    message.save(function(err){
        if(err){
            cb(err, null)
            return;
        }
        messages.push(message);
        cb(null, message);
    })
}

function createUsers(cb) {
    /*
     * userDetail = {
                    first_name: first_name,
                    last_name: last_name,
                    username: username,
                    password: password,
                    member: member,
                    admin: admin,
                };
     */
    async.series([
        function(callback){
            userCreate("John", "Doe", "JDoe92", "PoExile123", false, false, callback);
        },
        function(callback){
            userCreate("Nilo", "Foxtrot", "NFox112", "ExileCon008", false, false, callback);
        },

    ], cb);
}

function createMessages(cb) {
    /**
     * messageDetal = {
                        user: user,
                        title: title,
                        text: text,
                        timestamp: timestamp,
                };
     */
    async.series([
        function(callback){
            messageCreate(users[0], 'Testing', 'My Name is John Doe', Date.now(), callback);
        },

        function(callback){
            messageCreate(users[1], 'Testing', 'My name is Nilo Foxtrot', Date.now(), callback);
        }
    ], cb);
}

async.series([
    createUsers,
    createMessages,
],
function(err, results){
    if(err){
        console.log('FINAL ERR: ' + err);
    }

    mongoose.connection.close();
})