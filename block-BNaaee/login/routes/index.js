var express = require('express');
var router = express.Router();
const passport = require(`passport`)

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* SUCCESS - OAUTH LOGIN */
router.get('/success', function(req, res, next) {
  res.render(`success`,{ title: 'Express' })
})

/* FAILURE - OAUTH LOGIN */
router.get('/failure', function(req, res, next) {
  res.render(`failure`, { title: 'Express' })
})

/* GET - OAUTH LOGIN PROCESS */

router.get('/auth/github', passport.authenticate(`github`))

router.get('/auth/google', passport.authenticate(`google`, { scope: ['profile'] }))

router.get('/auth/github/callback', passport.authenticate(`github`, {failureRedirect: `/failure`}), (req, res) => {
  res.redirect(`/success`)
})

router.get('/oauth2/redirect/google', 
  passport.authenticate('google', { failureRedirect: '/' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/success');
  });



module.exports = router;