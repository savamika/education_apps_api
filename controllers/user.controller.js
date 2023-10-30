'use strict';
const User = require('../models/user.model');
const crypto = require('crypto');
const http = require("https");

exports.create = function(req, res) {
    
   var hashPassword = crypto.createHash('sha256').update(req.body.password).digest('hex');
    
    if(req.body.password != req.body.retrypass){
        res.status(200).send({ error:true, message: 'mohon ulangi kembali, password yang anda masukan tidak sama' });
    }
    
    var request = {
          id : crypto.randomBytes(32).toString("hex"),
          email : req.body.email,
          phone_number : req.body.phone_number,
          password: hashPassword,
          is_user: req.body.is_user,
          is_verified: 'NEW'
        }
    
    const new_user = new User(request);
    //handles null error
    if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.status(200).send({ error:true, message: 'Please provide all required field' });
    }else{
        User.create(new_user, function(err, user) {
          if (err)
          res.status(200).send(err);
          
          if(user == 'ALEADY_EXIST'){
              res.status(200).send({ error:true, message: 'akun email sudah terdaftar!' });
          }else{
              res.json({error:false,message:"Pendaftaran Akun Berhasil!",data:user});
          }
          
          
        });
    }
};

exports.findById = function(req, res) {
    User.findById(req.params.id, function(err, data) {
      if (err)
      res.send(err);
      res.json(data);
    });
};

exports.login = function(req, res) {
    User.login({username_or_email: req.body.username_or_email, password: req.body.password}, function(err, user) {
      if (err)
      res.send(err);
      
      if(user){
          res.json({error:false,message:"login berhasil!",data:user});
      }else{
          res.status(200).send({ error:true, message: 'pengguna tidak terdaftar!' });
      }
      
    });
};

exports.update = function(req, res, next) {
    
      var request = {
          id : req.body.id,
          username : req.body.username,
          email: req.body.email,
          gender: req.body.gender,
          picture: 'http://ajarin.org/public/images/'+req.files['picture'][0].filename,
          file_cv: 'http://ajarin.org/public/files/'+req.files['file_cv'][0].filename,
          district: req.body.district,
          sub_district: req.body.sub_district,
          city: req.body.city,
          address: req.body.address,
          latitude: req.body.latitude,
          longitude: req.body.longitude,
          skill: req.body.skill,
          sub_skill: req.body.sub_skill,
          service_rate: req.body.service_rate,
          service_fee: req.body.service_fee,
          about_mentor: req.body.about_mentor,
          is_verified: 'WAITING'
        }
		
	
    if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.status(200).send({ error:true, message: 'Please provide all required field' });
    }else{
        User.update(request, function(err, return_user) {
            if (err)
                res.send(err);
            res.json({ error:false, message: 'Permintaan Aktivasi Berhasil, Mohon tunggu proses verifikasi dari staff', data: return_user});
       });
    }
};
