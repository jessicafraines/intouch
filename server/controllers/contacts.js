'use strict';

var Contact = require('../models/contact');
//    mp      = require('multiparty');

exports.create = function(req, res){
//  var form = new mp.Form();
 // form.parse(req, function(err, fields, files){
 //   Contact.create(fields, files, function(err, contact){
  Contact.create(req.body, function(err, contact){
    res.send({contact:contact});
  });
};

exports.index = function(req, res){
  Contact.all(function(err, contacts){
    res.send({contacts:contacts});
  });
};
