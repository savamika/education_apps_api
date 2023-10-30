const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();

// user route
const user  	= require('./routes/user.routes');
const otp   	= require('./routes/otp.routes');
const mentor   	= require('./routes/mentor.routes');
const transaction = require('./routes/transaction.routes');

app.use(cors())

const port = process.env.PORT || 5000;

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse requests of content-type - application/json
app.use(bodyParser.json())

// using as middleware
app.use('/api/registration', user)
app.use('/api/users', user)
app.use('/api/getuser', user)

app.use('/api/otp', otp)

app.use('/api/mentor', mentor)

app.use('/api/gettransaction', transaction) 
app.use('/api/updatetransaction', transaction)
app.use('/api/getbilling', transaction)


// listen for requests
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});