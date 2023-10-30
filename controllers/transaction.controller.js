'use strict';
const Transaction = require('../models/transaction.model');
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

exports.getlisttransaction = function(req, res) {
	
	Transaction.getlisttransaction_model(req.params.id, function(err, return_tran) {
      if (err)
      res.send(err);
      
      if(return_tran){
          res.status(200).send({ error:false, message: 'list transaksi tersedia' , data: return_tran});
      }else{
          res.status(200).send({ error:true, message: 'transaksi tidak tersedia'});
      }
      
    });
};

exports.getlisttransactionbyid = function(req, res) {
	
	Transaction.getlisttransactionbyid_model(req.params.id, function(err, return_tran) {
      if (err)
      res.send(err);
      
      if(return_tran){
          res.status(200).send({ error:false, message: 'transaksi tersedia' , data: return_tran});
      }else{
          res.status(200).send({ error:true, message: 'transaksi tidak tersedia'});
      }
      
    });
};

exports.updatetransactionbyid = function(req, res) {
	
	var params = {
		id: req.params.id,
		status: req.body.status,
		start_time: req.body.start_time,
		end_time: req.body.end_time,
	}
	 
	Transaction.updatetransactionbyid_model(params, function(err, return_tran) {
      if (err)
      res.send(err);
       
	  res.json({ error:false, message: 'transaksi berhasil di update', data: return_tran});
      
    });
};

exports.getbilling = function(req, res) {
	
	Transaction.getbilling_model(req.params.id, function(err, return_tran) {
      if (err)
      res.send(err);
       
	  if(return_tran){
          res.status(200).send({ error:false, message: 'billing transaksi tersedia' , data: return_tran});
      }else{
          res.status(200).send({ error:true, message: 'billing transaksi tidak tersedia'});
      }
      
    });
};