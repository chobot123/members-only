const { body, validationResult } = require('express-validator');
require('dotenv').config();
var User = require('../models/user')

exports.becomeMember_get = function(req, res, next) {
    res.render('member-form', {title: 'Become a Member', user: res.locals.currentUser});
}

exports.becomeMember_post = [
    
    body('password').trim().isLength({min: 1}).escape(),

    (req, res, next) => {
        const errors = validationResult(req);

        if(!errors.isEmpty()){
            res.render('member-form', {title: 'Become a Member', user: res.locals.currentUser, errors: errors.array()});
            return;
        }
        if(req.body.password !== 'pokemon'){
            let error = new Error('Incorrect Password');
            res.render('member-form', {title: 'Become a Member', user: res.locals.currentUser, error: error})
        }
        else if(req.body.password === 'pokemon') {
            User.findOneAndUpdate({"_id": res.locals.currentUser._id}, {member: true})
            .exec(function(err) {
                if(err) {return next(err);}
                res.redirect('/');
            })
        }
        return;
    }
]

exports.becomeAdmin_get = function(req, res, next) {
    res.render('admin-form', {title: 'Become an Admin', user: res.locals.currentUser});
}

exports.becomeAdmin_post = [
    
    body('password', "Enter a Password").trim().isLength({min: 1}).escape(),

    (req, res, next) => {
        const errors = validationResult(req);

        if(!errors.isEmpty()){
            res.render('admin-form', {title: 'Become an Admin', user: res.locals.currentUser, errors: errors.array()});
            return;
        }
        if(req.body.password !== process.env.admin_pass){
            let error = new Error('Incorrect Password');
            res.render('admin-form', {title: 'Become an Admin', user: res.locals.currentUser, error: error})
        }
        else if(req.body.password === process.env.admin_pass) {
            console.log(res.locals.currentUser);
            User.findOneAndUpdate({"_id": res.locals.currentUser._id}, {member: true, admin: true})
            .exec(function(err) {
                if(err) {return next(err);}
                res.redirect('/');
            })
        }
        return;
    }
]