var passport = require('passport');
var facebookTokenStrategy = require('passport-facebook-token').Strategy;
var express = require('express');

var app = express();

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

passport.use(
    new facebookTokenStrategy(
        {
            clientID: '1604784233112082',
            clientSecret: 'd78c8a928622007ee2961649d7145922',
            profileFields: ['id', 'email', 'displayName', 'photos']

        }, 
        function(accessToken, refreshToken, profile, done) {
            return done(null, {
                provider: 'facebook',
                id:'asdfSADFSDFsdfsdfsdfSDFSDFSDF',
                displayName:profile._json.name,
                name: {},
                emails: [
                    {value:profile._json.email, type:'home'}
                ],
                photos: []
            });
        }
    )
);

app.get('/', passport.authenticate('facebook-token'), function (req, res) {
     res.json({
        'message': 'Hello World'
    });
});

app.listen(9000);
