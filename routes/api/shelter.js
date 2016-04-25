var express = require('express');
var _ = require('lodash');
var router = express.Router();
var Shelter = require('../../models/Shelter');
var multer = require('multer');
var upload = multer({ dest: 'public/img/upload/ ' });

router.get('/:id', function(req, res) {
  var shelterId;

  console.log('req.params: ', req.params);

  if(!req.params || !req.params.id) {
    res.send({ success: false, msg: 'Must provide a valid shelter id.' });
    return;
  }

  console.log('req.params.id: ', req.params.id);

  shelterId = req.params.id;

  Shelter.findById(shelterId, function (err, shelter) {
    if(err) res.send({ success: false, msg: 'Error on findById:' + err, errmsg: err });
    else    res.send({ success: true, data: { shelter: shelter } });
  });
});

router.post('/', function(req, res) {
  var shelter, shelterId;

  console.log('req.query: ', req.query);

  if(!req.query) {
    res.send({ success: false, msg: 'Must provide a query object.' });
    return;
  }

  shelter = req.query;

  new Shelter(shelter).save(function (err, shelter) {
    if(err) res.send({ success: false, msg: 'Error on save:' + err, errmsg: err });
    else    res.send({ success: true, data: { shelterId: shelter._id } });
  });
});

router.put('/:id', function(req, res) {
  var shelter, shelterId;

  if(!req.params || !req.params.id) {
    res.send({ success: false, msg: 'Must provide a valid shelter id.' });
    return;
  }

  console.log('req.body: ', req.body);

  if(!req.body || _.isEmpty(req.body)) {
    res.send({ success: false, msg: 'Must provide data in request body.' });
    return;
  }

  shelter = req.body;
  shelterId = req.params.id;

  Shelter.findById(shelterId, function (err, oldShelter) {
    if(err) {
      res.send({ success: false, msg: 'Error on findById:' + err, errmsg: err });
      return;
    }
    shelter = _.assign(oldShelter, shelter);
    shelter.save(function (err, shelter) {
      if(err) res.send({ success: false, msg: 'Error on save:' + err, errmsg: err });
      else    res.send({ success: true, data: { shelter: shelter } });
    });
  });
});

router.delete('/:id', function(req, res) {
  var shelterId;

  if(!req.params || !req.params.id) {
    res.send({ success: false, msg: 'Must provide a valid shelter id.' });
    return;
  }

  shelterId = req.params.id;
  shelter = { isRemoved: true };

  Shelter.findById(shelterId, function (err, oldShelter) {
    if(err) {
      res.send({ success: false, msg: 'Error on findById:' + err, errmsg: err });
      return;
    }
    shelter = _.assign(oldShelter, shelter);
    shelter.save(function (err, shelter) {
      if(err) res.send({ success: false, msg: 'Error on save:' + err, errmsg: err });
      else    res.send({ success: true, data: { shelter: shelter } });
    });
  });
});

router.post('/:id/avatar', upload.single('avatar'), function(req, res, next) {
  req.file;
});

module.exports = router;
