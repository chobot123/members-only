var express = require('express');
var router = express.Router();

var auth_controller = require('../controllers/authController');
var user_controller = require('../controllers/userController')
var message_controller = require('../controllers/messageController');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.redirect('/home');
});

//----- sign-up -----//
router.get('/sign-up', auth_controller.signup_get);
router.post('/sign-up', auth_controller.signup_post);
router.get('/log-in', auth_controller.login_get);
router.post('/log-in', auth_controller.login_post);
router.get('/log-out', auth_controller.logout_get);



//----- create message -----//
router.get('/create-message', message_controller.create_message_get);
router.post('/create-message', message_controller.create_message_post);


//----- membership form -----//
router.get('/member', user_controller.becomeMember_get);
router.post('/member', user_controller.becomeMember_post);

//----- admin form -----//
router.get('/admin', user_controller.becomeAdmin_get);
router.post('/admin', user_controller.becomeAdmin_post);

//----- delete message -----//
router.post('/delete', message_controller.delete_message_post);

module.exports = router;
