var express = require('express');
// var _ = require('lodash');
var router = express.Router();

router.get('/search', function(req, res) {
  console.log('req: ', req);
  console.log('req.body: ', req.body);
  console.log('req.data: ', req.data);
  console.log('req.query: ', req.query);
  res.send({msg: 'success'});
});

module.exports = router;
