var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var passport = require('passport');
var config = require('../config/database');
require('../config/passport')(passport);
var jwt = require('jsonwebtoken');
var User = require("../models/Utilisateur");
var Product = require("../models/Produit");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('Express RESTful API');
});

// Inscription
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

// Connexion
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

// Get utilisateur courant
router.get('/me', passport.authenticate('jwt', { session: false}), function(req, res) {

  // check header or url parameters or post parameters for token
    var token = req.body.token || req.query.token || req.headers['x-access-token'] || req.headers['authorization'];

    // decode token
    if (token) {

      var hash = config.secret.replace(/^\$2y(.+)$/i, '\$2a$1');
      // verifies secret
      jwt.verify(token, hash, function (err, decoded) {
        if (err) {
          return res.status(403).json({ message: 'Invalid token' });
        } else {
          // if everything is good, save to request for use in other routes
          req.decoded = decoded;
          User.getUserInformationById(req.decoded.id, function (err, user) {
            req.currentUser = user;
            next();
          });
        }
      });
    } else {
      // if there is no token

      return res.status(403).json({
        message: 'Invalid token'
      });
    }

  // var token = getToken(req.headers);
  // if (token) {
  //
  //   User.findOne({
  //     username: req.body.username
  //   }, function(err, user) {
  //     if (err) throw err;
  //
  //     if (!user) {
  //       res.status(401).send({success: false, msg: 'Utilisateur non trouvé.'});
  //     } else {
  //       var copyUser = new User({
  //         username: user.username,
  //         firstname: user.firstname,
  //         lastname: user.lastname,
  //         email: user.email
  //       });
  //       res.json(copyUser);
  //     }
  //   });
  // } else {
  //   return res.status(403).send({success: false, msg: 'Vous n\'avez pas les authorisations nécessaires.'});
  // }
});

// Get liste des produits
router.get('/product', function(req, res) {
    Product.find(function (err, products) {
      if (err) return next(err);
      res.json(products);
    });
});

// Parse le token
getToken = function (headers) {
  if (headers && headers.authorization) {
    var parted = headers.authorization.split(' ');
    if (parted.length === 2) {
      return parted[1];
    } else {
      return null;
    }
  } else {
    return null;
  }
};

module.exports = router;
