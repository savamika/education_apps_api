'use strict';
var dbConn = require('./../db.config');
const crypto = require('crypto');

var Transaction = function(trn){
  this.id            = user.id;
  this.siswa_id     = user.siswa_id;
  this.mentor_id     = user.mentor_id;
  this.class_method      = user.class_method;
  this.packet_method  = user.packet_method;
  this.days	  	 = user.days;
  this.booking_date	  	 = user.booking_date;
  this.req_start	  	 = user.req_start;
  this.req_end	  	 = user.req_end;
  this.latitude	  	 = user.latitude;
  this.longitude	 = user.longitude;
  this.note		 	 = user.note;
  this.status		 = user.status;
  this.start_time	 = user.start_time;
  this.end_time	 	 = user.end_time;
  this.trn_number 	 = user.trn_number;
  this.request_time 	 	 = user.request_time;
  this.course_id = user.course_id;
};

Transaction.getlisttransaction_model = function (siswa_id, result) {
       
	   var where = "WHERE siswa_id = '"+siswa_id+"'";
	   
       dbConn.query("Select * FROM trn_booking "+where, "", function (err, res) {
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

Transaction.getlisttransactionbyid_model = function (tran_id, result) {
       
	   var where = "WHERE id = '"+tran_id+"'";
	   
       dbConn.query("Select * FROM trn_booking "+where, "", function (err, res) {
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

Transaction.updatetransactionbyid_model = function (params, result) {
       
	   dbConn.query("UPDATE trn_booking SET status=?, start_time=?, end_time=? WHERE id = ?", [params.status, params.start_time, params.end_time, params.id], function (err, res) {
			if(err) {
			  console.log("error: ", err);
			  result(null, err);
			}else{
			  result(null, params);
			}
		});
             
};

Transaction.getbilling_model = function (trn_number, result) {
       
	   var where = "WHERE a.trn_number = '"+trn_number+"'";
	   
       dbConn.query("Select payment_method, CONCAT(b.firstname, ' ', ifnull(b.lastname, '')) siswa_name, CONCAT(c.firstname, ' ', ifnull(c.lastname, '')) mentor_name, trn_number, '1' as duration, '0' as additional_duration, (SELECT sum(total_billing) FROM trn_billing WHERE trn_number = a.trn_number) as total  FROM trn_booking a JOIN users b ON a.siswa_id = b.id JOIN users c ON a.mentor_id = c.id "+where, "", function (err, res) {
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

module.exports= Transaction;