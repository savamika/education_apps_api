'use strict';
var dbConn = require('./../db.config');
const crypto = require('crypto');

var User = function(user){
  this.id            = user.id;
  this.firstname     = user.firstname;
  this.lastname      = user.lastname;
  this.username      = user.username;
  this.phone_number  = user.phone_number;
  this.email	  	 = user.email;
  this.password	  	 = user.password;
  this.address	  	 = user.address;
  this.gender	  	 = user.gender;
  this.about_mentor	 = user.about_mentor;
  this.picture	  	 = user.picture;
  this.file_cv	  	 = user.file_cv;
  this.district	  	 = user.district;
  this.sub_district	 = user.sub_district;
  this.city		 	 = user.city;
  this.latitude		 = user.latitude;
  this.longitude	 = user.longitude;
  this.skill	 	 = user.skill;
  this.sub_skill 	 = user.sub_skill;
  this.is_user 	 	 = user.is_user;
  this.is_verified   = user.is_verified;
  this.refresh_token = user.refresh_token;
  this.createdAt     = new Date();
  this.updatedAt     = new Date();
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

User.create = function (newUser, result) {
    
    var dateNow = new Date();
    var OTP = makeid(6);
    
    dbConn.query("Select * from users where email = ?", [newUser.email], function (err, res) {
        if(err) {
          console.log("error: ", err);
          result(err, null);
        }
        else{
            if(res.length > 0){
                result(null, 'ALEADY_EXIST');
            }else{
                
                dbConn.query("INSERT INTO users set ?", newUser, function (err, res) {
                    if(err) {
                      console.log("error: ", err);
                      result(err, null);
                    }
                    else{
                        
                        var createOtp = {
                                id: crypto.randomBytes(32).toString("hex"),
                                otp: OTP,
                                request_time: dateNow,
                                user_id: newUser.id,
                                is_used: 'REQ'
                          };
                        
                          dbConn.query("INSERT INTO reg_otp set ?", createOtp, function (err, res) {
                              if(err) {
                                  console.log("error: ", err);
                                  result(err, null);
                                }else{
                                    
                                    var dataMessage = {
                                             id : crypto.randomBytes(32).toString("hex"),
                                             direction_number: newUser.phone_number,
                                             message: "your OTP "+OTP,
                                             created_time: dateNow
                                      };
                                    
                                    dbConn.query("INSERT INTO send_message set ?", dataMessage, function (err, res) {
                                            if(err) {
                                              console.log("error: ", err);
                                              result(err, null);
                                            }
                                            else{
                                              console.log(res);
                                              result(null, {"userId": newUser.id, "email": newUser.email, "is_user": newUser.is_user, "is_verified": newUser.is_verified});
                                            }
                                     });
                                }
                          });
                          
                          
                        
                    }
                });
                
            }
          
        }
    });
    
    
};

User.findById = function (id, result) {
    dbConn.query("Select *, '4.5' as rating, '25' as siswa, '200' as review, about_mentor from users where id = ? ", id, function (err, res) {
    if(err) {
      console.log("error: ", err);
      result(err, null);
    }
    else{
      result(null, res);
    }
    });
};

User.login = function (req, result) {
    
    var hashPassword = crypto.createHash('sha256').update(req.password).digest('hex');
    
    dbConn.query("Select * from users where (username = ? OR email = ?) and password = ?", [req.username_or_email, req.username_or_email, hashPassword], function (err, res) {
        if(err) {
          console.log("error: ", err);
          result(err, null);
        }
        else{
            if(res.length > 0){
                result(null, res);
            }else{
                result(null, false);
            }
          
        }
    });
};

User.update = function(updateUser, result){
	// result(null, updateUser);
    dbConn.query("UPDATE users SET username=?, email=?, gender=?, about_mentor=?, picture=?, file_cv=?, district=?, sub_district=?, city=?, address=?, latitude=?, longitude=?, skill=?, sub_skill=?, service_rate=?, service_fee=?, about_mentor=?, is_verified=? WHERE id = ?", [updateUser.username, updateUser.email, updateUser.gender, updateUser.about_mentor, updateUser.picture, updateUser.file_cv, updateUser.district, updateUser.sub_district, updateUser.city, updateUser.address, updateUser.latitude, updateUser.longitude, updateUser.skill, updateUser.sub_skill, updateUser.service_rate, updateUser.service_fee, updateUser.about_mentor, updateUser.is_verified, updateUser.id], function (err, res) {
        if(err) {
          console.log("error: ", err);
          result(null, err);
        }else{
          result(null, updateUser);
        }
    });
};


module.exports= User;