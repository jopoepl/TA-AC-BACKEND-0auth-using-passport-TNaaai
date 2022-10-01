var express = require('express');
var router = express.Router();
const passport = require(`passport`)

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* SUCCESS - OAUTH LOGIN */
router.get('/success', function(req, res, next) {
  res.send(`LOGIN SUCCESSFUL`)
})

/* FAILURE - OAUTH LOGIN */
router.get('/failure', function(req, res, next) {
  res.send(`LOGIN failure`)
})

/* GET - OAUTH LOGIN PROCESS */

router.get('/auth/github', passport.authenticate(`github`))

router.get('/auth/github/callback', passport.authenticate(`github`, {failureRedirect: `/failure`}), (req, res) => {
  res.redirect(`/success`)
})



module.exports = router;
