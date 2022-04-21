let User = require('../models/user');
var bcrypt = require('bcryptjs');
const { body, validationResult } = require('express-validator');
var passport = require('passport');

exports.signup_get = function(req, res, next) {
    res.render('sign-up', {title: 'Sign Up'});
}

exports.signup_post = [
    
    body('firstname').trim().isLength({min: 1}).withMessage('Please enter a first name').escape(),
    body('lastname').trim().isLength({min: 1}).withMessage('Please enter a last name').escape(),
    body('username').trim().isLength({min: 6}).withMessage('Please enter at least 6 characters').escape(),
    body('password').trim().isStrongPassword().withMessage('Please have a minimum length of 8, a lowercase letter, an uppercase letter, a number, and a symbol(@,!,etc...)')
        .escape(),
    body('confirmpassword').custom((value, {req }) => {
        if(value !== req.body.password) {
            throw new Error('Password confirmation does not match password');
        }
        return true;
    }),

    (req, res, next) => {

        const errors = validationResult(req);

        //if there are errors, render form again with the sanitized values/error messages
        if(!errors.isEmpty()){
            console.log('Error:' + errors);
            
            res.render('sign-up', {title: 'Sign Up', errors: errors.array(),
                    firstname: req.body.firstname, last_name: req.body.lastname, username: req.body.username})
            return;
        }
        else{
            //if there are no errors, check if username already exists in database
            User.find({"username": req.body.username})
            .exec(function(err, results){
                if(err){return next(err);}
                if(results.length > 0) {
                    let newErr = new Error('Username already exists');
                    res.render('sign-up', {title: 'Sign Up', error: newErr});
                    return;
                }
            })

             //make a user with a hashed password
            bcrypt.hash(req.body.password, 10, (err, hashedPassword) => {
                if(err) return next(err);

                let user = new User({
                    first_name: req.body.firstname,
                    last_name: req.body.lastname,
                    username: req.body.username,
                    password: hashedPassword,
                    member: false,
                    admin: false,
                });

                user.save(function(err) {
                    if(err){return next(err);}
                    res.redirect('/home');
                })
            })
        }
    }
];

exports.login_get = function(req, res, next) {
    //if already a user
    if(res.locals.currentUser) {res.redirect('/');}
    res.render('log-in', {title: 'Login'});
}

exports.login_post = passport.authenticate('local', {
    session: true,
    successRedirect: '/',
    failureRedirect: '/log-in',
});

exports.logout_get = function(req, res, next) {
    req.logout();
    res.redirect('/');
}