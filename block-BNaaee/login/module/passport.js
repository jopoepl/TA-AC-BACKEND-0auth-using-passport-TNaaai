var GoogleStrategy = require('passport-google-oauth20').Strategy;
const passport = require(`passport`)
var GitHubStrategy = require(`passport-github`).Strategy
var User = require(`../models/user`)

require(`dotenv`).config()

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/oauth2/redirect/google"
  },
  function(accessToken, refreshToken, profile, cb) {
    console.log(profile, "PROFILE")
    var profileData = {
        name: profile.displayName,
        photo: profile._json.picture
    }
    User.findOne({username: profile.displayName}, (err, user) => {
        if(err) return cb(err)
        if(!user){
            User.create(profileData, (err, createdUser) => {
                if(err) return cb(err);
                return cb(null, createdUser)
            })
        }
        cb(null, user)
    })
  }
));




passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: "/auth/github/callback"
  },
  function(accessToken, refreshToken, profile, cb) {
    console.log(profile, "PROFILE")
    var profileData = {
        name: profile.displayName,
        username: profile.username,
        photo: profile._json.avatar_url
    }

    User.findOne({name: profile.displayName}, (err, user) => {
        if(err) return cb(err)
        if(!user){
            User.create(profileData, (err, createdUser) => {
                if(err) return cb(err);
                return cb(null, createdUser)
            })
        }
        cb(null, user)
    })
  }
  ));

  passport.serializeUser((user, cb) => {
    cb(null, user.id )
  })

  passport.deserializeUser(function(id, cb) {
    User.findById(id, (err, user) => {
        cb(err, user)
    })
  })
