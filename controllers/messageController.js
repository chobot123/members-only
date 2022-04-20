var Message = require('../models/message');
const { body, validationResult } = require('express-validator');

exports.create_message_get = function(req, res, next) {

    res.render('create-message', {title: 'Create a Message', user: res.locals.currentUser});

}

exports.create_message_post = [
    
    body('title').trim().isLength({min: 1}).withMessage('Please Enter a Title').escape(),
    body('text').trim().isLength({min: 1}).withMessage('Please Enter a Message').escape(),

    (req, res, next) => {

        const errors = validationResult(req);
        //if there are errors, render with errors
        if(!errors.isEmpty()){
            console.log('ERROR');
            res.render('create-message', {title: 'Create a Message', user: res.locals.currentUser, errors: errors.array()})
            return;
        }

        //if there are no errors -> get user id and make a new message obj
        //with it -> push to messages

        let message = new Message({
            
            user: res.locals.currentUser,
            title: req.body.title,
            text: req.body.text,
            timestamp: Date.now(),

        });

        message.save(function(err){
            if(err){return next(err);}
            res.redirect('/home');
        })


    }
]