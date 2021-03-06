const Message = require('../models/message');

//home page
exports.index = async function(req, res, next){
    //get list of messages -> sort by time descending
    try {

        //get list of messages and sort in ascending order
        const messages = await Message
                            .find()
                            .sort({ "timestamp" :  1 })
                            .populate("user");

        return res.render('index', {title: 'PokeDex Pals', user: res.locals.currentUser, messages: messages})

    } catch(err) {
        return err;
    }
}