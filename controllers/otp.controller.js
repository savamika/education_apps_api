'use strict';
const Otp = require('../models/otp.model');
const crypto = require('crypto');
const http = require("https");

exports.requestotp = function(req, res) {
    Otp.requestotp_model(req.params.id, function(err, data) {
      if (err)
      res.send(err);
       res.status(200).send({ error:false, message: 'permintaan otp berhasil!'});
    });
};


exports.checkotp = function(req, res) {
    Otp.checkotp_model({otp: req.body.otp, user_id: req.body.user_id}, function(err, return_otp) {
      if (err)
      res.send(err);
      
      if(return_otp){
          res.status(200).send({ error:false, message: 'otp valid!' , data: return_otp});
      }else{
          res.status(200).send({ error:true, message: 'otp invalid!'});
      }
      
    });
};