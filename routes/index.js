var express = require('express');
var router = express.Router();

module.exports = function(passport) {


var isAuthenticated = function (req, res, next) {
    if (req.isAuthenticated())
        return next();
        res.redirect('/login');
    }

    /* GET home page. */
    router.get('/', function(req, res, next) {
      res.render('index', { title: 'Express' });
    });

    router.get('/login', function(req, res, next) {
        res.render('login');
    });

    router.post('/login', passport.authenticate('login', {
        successRedirect: '/memberarea',
        failureRedirect: '/no'
    }));

    router.get('/register', function(req, res, next) {
        res.render('register');
    });

    router.post('/register', passport.authenticate('register', {
        successRedirect: '/login',
        failureRedirect: '/no'
    }));

    router.get('/no', function(req, res, next) {
        res.send('unauthorized');
    })

    router.get('/memberarea', isAuthenticated, function(req, res, next) {
        res.render('memberarea');
    });

    router.get('/logout', function(req, res, next) {
        req.logout();
        res.redirect('/login');
    });

    return router;
}

