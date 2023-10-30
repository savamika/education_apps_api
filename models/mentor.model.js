'use strict';
var dbConn = require('./../db.config');
const crypto = require('crypto');

var Mentor = function(mentor){
  this.id            = user.id;
  this.firstname     = user.firstname;
  this.lastname      = user.lastname;
  this.username      = user.username;
  this.phone_number  = user.phone_number;
  this.address	  	 = user.address;
  this.gender	  	 = user.gender;
  this.picture	  	 = user.picture;
  this.file_cv	  	 = user.file_cv;
  this.district	  	 = user.district;
  this.sub_district	 = user.sub_district;
  this.city		 	 = user.city;
  this.latitude		 = user.latitude;
  this.longitude	 = user.longitude;
  this.skill	 	 = user.skill;
  this.sub_skill 	 = user.sub_skill;
  this.class 	 	 = user.class;
  this.available_date = user.available_date;
  this.service_rate  = user.service_rate;
  this.service_fee   = user.service_fee;
  this.is_user 	 	 = user.is_user;
};

Mentor.getlistmentor_model = function (filters, result) {
       
	   
	   if(filters.category != ''){
		   
		   var withCategory = "";
		   if(filters.category == 'TERDEKAT'){
			   withCategory += " AND id in('25521ca8ddf09cd894cc645fbe7a10dd1f23f1e5fd562156e4479cef3fb897d7', 'f4dfe06fa93305caa76fe4e4a2499063650c97022cd832ec890fa32a79114864')";
		   }else if(filters.category == 'PILIHAN'){
			   withCategory += " AND id in('f4dfe06fa93305caa76fe4e4a2499063650c97022cd832ec890fa32a79114864', 'ff06013f83ae8a7b57d6a745aa3fce26392340c37fda1e840f6f8b5e067a6169', '73ed1482ab7bc0ff55da9e6dafb9ca59576ac0405b4c86be81f4d9854d997925')";
		   }else{
			   withCategory += " AND class = '"+filters.class+"'";
			   withCategory += " AND skill = '"+filters.category+"'";
			   if(filters.available_date != '' && filters.available_date != undefined){				   
				withCategory += " AND available_date = '"+filters.available_date+"'";
			   }
			   withCategory += " AND gender = '"+filters.gender+"'";
		   }
		   
			var where = "WHERE is_user = 'MENTOR'"+withCategory;
	   }else{
		   var where = "WHERE is_user = 'MENTOR'";
	   }
	   
	   if(filters.gender != '' && filters.gender != undefined){
		   where += " AND gender = '"+filters.gender+"'";
	   }if(filters.available_date != '' && filters.available_date != undefined){
		   where += " AND available_date = '"+filters.available_date+"'";
	   }if(filters.sub_skill != '' && filters.sub_skill != undefined){
		   where += " AND sub_skill = '"+filters.sub_skill+"'";
	   }if(filters.class != '' && filters.class != undefined){
		   where += " AND class = '"+filters.class+"'";
	   }
	   
       dbConn.query("Select id as mentor_id, firstname, lastname, phone_number, address, gender, picture, district, sub_district, city, latitude, longitude, skill, sub_skill, class, available_date, available_time, service_rate, service_fee, is_login as status, '4.5' as rating, '25' as siswa, '200' as review, about_mentor from users "+where, "", function (err, res) {
		if(err) {
		  console.log("error: ", err);
		  result(err, null);
		}
		else{
		  if(res.length > 0){  
			result(null, res);
		  }else{
			result(null, null);
		  }
		}
		}); 
             
};

Mentor.bookingmentor_model = function (param, result) {
       
       dbConn.query("INSERT INTO trn_booking set ?", param, function (err, res) {
				if(err) {
				  console.log("error: ", err);
				  result(err, null);
				}
				else{
					
					var paramBilling = {
						id : crypto.randomBytes(32).toString("hex"),
						trn_number: param.trn_number,
						total_billing: 0,
						trx_time: new Date()
					}
					
					dbConn.query("INSERT INTO trn_billing set ?", paramBilling, function (err2, res2) {
							if(err2) {
							  console.log("error: ", err2);
							  result(err2, null);
							}
							else{
								
							  var respon = {
								  tran_id: param.id,
								  class_method: param.class_method,
								  packet_method: param.packet_method,
								  packet_subscription: param.packet_subscription,
								  days: param.days,
								  booking_date: param.booking_date,
								  payment_method: param.payment_method,
								  req_start: param.req_start,
								  req_end: param.req_end,
								  status: param.status,
								  trn_number: param.trn_number,
								  course_id: param.course_id
							  }
							  result(null, respon);
							}
					});
				}
		}); 
             
};

Mentor.giverating_model = function (param, result) {
       
       dbConn.query("INSERT INTO mentor_rating set ?", param, function (err, res) {
				if(err) {
				  console.log("error: ", err);
				  result(err, null);
				}
				else{
					result(null, param);
				}
		}); 
             
};

module.exports= Mentor;