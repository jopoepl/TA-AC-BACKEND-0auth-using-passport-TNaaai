const passport = require(`passport`)
var GitHubStrategy = require(`passport-github`).Strategy
var User = require(`../models/user`)

require(`dotenv`).config()



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

    User.findOne({username: profile.username}, (err, user) => {
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

