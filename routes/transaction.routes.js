const express = require('express');
const router = express.Router();

const transactionController =   require('../controllers/transaction.controller');

router.get('/:id', transactionController.getlisttransaction);
router.get('/getbyid/:id', transactionController.getlisttransactionbyid);
router.put('/tranid/:id', transactionController.updatetransactionbyid); 
router.get('/trxnumber/:id', transactionController.getbilling); 

module.exports = router;