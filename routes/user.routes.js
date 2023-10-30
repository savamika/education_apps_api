const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

const userController =   require('../controllers/user.controller');


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
       if (file.fieldname === "picture") {
		   cb(null, '../public_html/public/images/')
	   }
	   else if (file.fieldname === "file_cv") {
		   cb(null, '../public_html/public/files/');
	   }
    },
    filename: (req, file, cb) => {
        cb(null, Date.now()+'-'+file.originalname);
    }
});

const upload = multer({
	  storage: storage,
	  fileFilter: (req, file, cb) => {
		if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg' || file.mimetype === 'application/pdf') {
		  cb(null, true)
		} else {
		  cb(null, false)
		  // return cb(new Error('Only .png, .jpg and .pdf format allowed!'))
		   res.status(200).send({ error:true, message: 'Only .png, .jpg and .pdf format allowed!' });
		}
	  }
})
 
router.post('/', userController.create);
router.get('/:id', userController.findById);
router.post('/activation', upload.fields([{name: 'picture', maxCount: 1}, {name: 'file_cv', maxCount: 1}]), userController.update);
router.post('/login', userController.login);


module.exports = router;