const express = require('express')
const app = express()
const port = 8000
var session = require('express-session');
var cors = require('cors')

app.use(express.urlencoded({extended: false, limit:'20mb'})); 
app.use(express.json({limit:'20mb'}))

app.use(cors())
app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));

app.get('/', (req, res) => res.send('RESTFUL API KungLao Library'))

//route url
const appRoute = require('./routes/route');
app.use('/', appRoute);

app.listen(port, () => console.log(`Example app listening on port ${port}!`))