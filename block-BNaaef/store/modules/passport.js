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
function(accessToken, refreshToken, profile, done) {
    console.log(profile, "PROFILE")
    var profileData = {
        fname: profile.displayName,
        email: profile.emails[0].value,
    }

    User.findOne({email: profileData.email}, (err, user) => {
        if(err) return done(err)
        console.log(user, "Found USER")
        if(!user){
            console.log("Starting To Create User")
            User.create(profileData, (err, user) => {
                if(err) return done(err);
                console.log(user, "Created User")
                return done(null, user)
            })
        }
        return done(null, user)
        
    })
  }
));




passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: "/auth/github/callback"
  },
 function(accessToken, refreshToken, profile, done) {
    console.log(profile, "PROFILE")
    var profileData = {
        fname: profile.displayName,
        email: profile._json.email,
        // cart: [], 
        // blocked: false

    }
    console.log("DISPLAYNAME",  profileData )

    User.findOne({email: profileData.email}, (err, user) => {
        if(err) return done(err)
        console.log(user, "Found USER")
        if(!user){
            console.log("Starting To Create User")
            User.create(profileData, (err, user) => {
                if(err) return done(err);
                console.log(user, "Created User")
                return done(null, user)
            })
        }
        return done(null, user)
    })
  }
  ));

  passport.serializeUser((user, cb) => {
    user.type = "user"
    console.log(user, "serialize user")
    cb(null, {id: user.id, type: user.type, name: user.fname})
  })

  passport.deserializeUser(function(id, cb) {
    User.findById(id, (err, user) => {
        cb(err, user)
    })
  })
