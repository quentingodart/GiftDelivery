var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var passport = require('passport');
var config = require('../config/database');
require('../config/passport')(passport);
var jwt = require('jsonwebtoken');
var User = require("../models/Utilisateur");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('Express RESTful API');
});

router.post('/signup', function(req, res) {
  if (!req.body.username || !req.body.firstname || !req.body.lastname ||
    !req.body.email || !req.body.password) {
    res.json({success: false, msg: 'Veuillez renseigner tous les champs.'});
  } else {
    var newUser = new User({
      username: req.body.username,
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      password: req.body.password
    });
    // save the user
    newUser.save(function(err) {
      if (err) {
        return res.json({success: false, msg: 'Ce nom d\'utilisateur est déjà utilisé.'});
      }
      res.json({success: true, msg: 'L\'utilisateur a bien été créé.'});
    });
  }
});

router.post('/signin', function(req, res) {
  User.findOne({
    username: req.body.username
  }, function(err, user) {
    if (err) throw err;

    if (!user) {
      res.status(401).send({success: false, msg: 'Utilisateur non trouvé.'});
    } else {
      // check if password matches
      user.comparePassword(req.body.password, function (err, isMatch) {
        if (isMatch && !err) {
          // if user is found and password is right create a token
          var token = jwt.sign(user.toJSON(), config.secret);
          // return the information including token as JSON
          res.json({success: true, token: 'JWT ' + token});
        } else {
          res.status(401).send({success: false, msg: 'Combinaison nom d\'utilisateur/mot de passse invalide.'});
        }
      });
    }
  });
});

module.exports = router;
