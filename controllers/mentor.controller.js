'use strict';
const Mentor = require('../models/mentor.model');
const crypto = require('crypto');
const http = require("https");


function maketrn_number(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

exports.getlistmentor = function(req, res) {
	
	var filters = {
		category: req.body.category,
		available_date: req.body.available_date,
		gender: req.body.gender,
		sub_skill: req.body.sub_skill,
		class: req.body.class
	}
	// res.status(200).send({ error:false, message: 'mentor tersedia' , data: filters});
    Mentor.getlistmentor_model(filters, function(err, return_mentor) {
      if (err)
      res.send(err);
      
      if(return_mentor){
          res.status(200).send({ error:false, message: 'mentor tersedia' , data: return_mentor});
      }else{
          res.status(200).send({ error:true, message: 'mentor tidak tersedia'});
      }
      
    });
};

exports.bookingmentor = function(req, res) {
	
	var param = {
		id : crypto.randomBytes(32).toString("hex"),
		siswa_id: req.body.user_id,
		mentor_id: req.body.mentor_id,
		class_method: req.body.class_method,
		packet_method: req.body.packet_method,
		packet_subscription: req.body.packet_subscription,
		days: req.body.days,
		booking_date: req.body.booking_date,
		payment_method: req.body.payment_method,
		req_start: req.body.req_start,
		req_end: req.body.req_end,
		latitude: req.body.latitude,
		longitude: req.body.longitude,
		note: req.body.note,
		status: 'WAITING',
		request_time: new Date(),
		course_id: req.body.course_id,
		trn_number: maketrn_number(12),
		
	}
	
    Mentor.bookingmentor_model(param, function(err, return_booking) {
      if (err)
      res.send(err);
      
      if(return_booking){
          res.status(200).send({ error:false, message: 'pemesanan jadwal berhasil' , data: return_booking});
      }else{
          res.status(200).send({ error:true, message: 'pemesanan jadwal gagal'});
      }
      
    });
};

exports.giverating = function(req, res) {
	
	var param = {
		id : crypto.randomBytes(32).toString("hex"),
		siswa_id: req.body.user_id,
		mentor_id: req.body.mentor_id,
		rating: req.body.rating,
		give_time: new Date()
		
	}
	
    Mentor.giverating_model(param, function(err, return_rating) {
      if (err)
      res.send(err);
      
      if(return_rating){
          res.status(200).send({ error:false, message: 'berhasil memberi rating' , data: return_rating});
      }else{
          res.status(200).send({ error:true, message: 'gagal memberi rating'});
      }
      
    });
};