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
        res.send('login page');
    });

    router.post('/login', passport.authenticate('login', {
        successRedirect: '/memberarea',
        failureRedirect: '/gtfo'
    }));

    router.get('/register', function(req, res, next) {
        res.send('register page');
    });

    router.post('/register', passport.authenticate('register', {
        successRedirect: '/login',
        failureRedirect: '/gtfo'
    }));

    router.get('/gtfo', function(req, res, next) {
        res.send('gtfo');
    })

    router.get('/memberarea', isAuthenticated, function(req, res, next) {
        res.send('member area');
    });

    router.get('/logout', function(req, res, next) {
        req.logout();
        res.redirect('/login');
    });

    return router;
}

