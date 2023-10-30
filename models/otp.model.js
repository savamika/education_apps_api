'use strict';
var dbConn = require('./../db.config');
const crypto = require('crypto');

var Otp = function(otp){
  this.id            = otp.id;
  this.otp           = otp.otp;
  this.request_time  = new Date();
  this.expired_time  = otp.expired_time;
  this.user_id       = otp.user_id;
  this.is_used       = otp.is_used;
};

function makeid(length) {
    var result           = '';
    var characters       = '01234567899876543211234567890';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

Otp.requestotp_model = function (user_id, result) {
        
        var dateNow = new Date();
        var OTP = makeid(6);
        
        dbConn.query("Select * from users where id = ?", [user_id], function (err1, res1) {
                if(err1) {
                  console.log("error: ", err1);
                  result(err1, null);
                }else{
                    
                    var createOtp = {
                            id: crypto.randomBytes(32).toString("hex"),
                            otp: OTP,
                            request_time: dateNow,
                            user_id: user_id,
                            is_used: 'REQ'
                      };
                    
                      dbConn.query("INSERT INTO reg_otp set ?", createOtp, function (err2, res2) {
                          if(err2) {
                              console.log("error: ", err2);
                              result(err2, null);
                            }else{
                                
                                var dataMessage = {
                                         id : crypto.randomBytes(32).toString("hex"),
                                         direction_number: res1[0].phone_number,
                                         message: "your OTP "+OTP,
                                         created_time: dateNow
                                  };
                                
                                dbConn.query("INSERT INTO send_message set ?", dataMessage, function (err3, res3) {
                                        if(err3) {
                                          console.log("error: ", err3);
                                          result(err3, null);
                                        }
                                        else{
                                          console.log(res3);
                                          result(null, {"userId": res1.id, "otp": OTP});
                                        }
                                 });
                            }
                      });
                    
                }
        });
        
        
             
};

Otp.checkotp_model = function (req, result) {
    
    dbConn.query("Select * from reg_otp where is_used = 'REQ' AND otp = ? and user_id = ?", [req.otp, req.user_id], function (err, res) {
        if(err) {
          console.log("error: ", err);
          result(err, null);
        }
        else{
            if(res.length > 0){
                dbConn.query("update reg_otp SET is_used = 'USED' where is_used = 'REQ' AND otp = ? and user_id = ?", [req.otp, req.user_id], function (err2, res2) {
                    
                    if(err2) {
                      console.log("error: ", err2);
                      result(err2, null);
                    }
                     result(null, {user_id: req.user_id});
                    
                });
               
                
            }else{
                result(null, false);
            }
          
        }
    });
};

module.exports= Otp;