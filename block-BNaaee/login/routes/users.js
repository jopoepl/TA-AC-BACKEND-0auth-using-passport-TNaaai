var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resokurasdce');
});


router.get('/logout', function(req, res, next) {
  console.log("IMVOKED")
  req.session.destroy()
  res.redirect(`/`)
});

module.exports = router;