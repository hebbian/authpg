var LocalStrategy = require('passport-local').Strategy;
module.exports = function(passport) {
    passport.serializeUser(function(user, next) {
        next(null, user);
    });
    passport.deserializeUser(function(user, next){
       next(null, user); 
    });
    passport.use('login', 
                 new LocalStrategy({ passReqToCallback : true  },
         function(req, username, password, next) {
             req.db.query("SELECT * from users WHERE username='"+username+"' AND password='"+password+"'",
                  function(err, result) {
                       if (err) {
                            return next(err);
                       } else {
                            if (result.rows.length != 0) {
                                req.session.userdata = result.rows;
                                return next(null, result.rows);
                            } else {
                                return next(null, false);
                            }
                       } 
                    });
                
        })
    );

    passport.use('register',
                new LocalStrategy({ passReqToCallback : true },
        function(req, username, password, next) {
            req.db.query("INSERT INTO users (username, password) VALUES ('"+username+"','"+password+"')",
                 function(err, result) {
                    if (result.rows.length != 0) {
                        return next(err); 
                    } else {
                        return next(null, 'ok');
                    }
                 }
                )}
        ));
                            
            
}
