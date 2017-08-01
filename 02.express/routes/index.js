var express = require('express');
var router = express.Router();

/* GET home page. */
router.route('/')
  .get((req, res, next) => {
    res.send('trying to get user list')
  })
  .post((req, res, next) => {
    res.send({msg: 'hello express'})
  })

module.exports = router;
