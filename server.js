require('dotenv').config();
const bodyParser = require('body-parser');
const express=  require('express');
const session = require('express-session');
const path = require('path');
const app = express();

//middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname, 'views')));
app.set('view engine', 'ejs');

//session
app.use(session({
    secret:'secret key',
    resave:true,
    saveUninitialized:false
}));

//database
require('./config/database');

//controller
const mycontroller = require('./controllers/mycontroller');
app.use('/', mycontroller);

//404
app.use((req,res,next)=>{
    const err = Error('page not found');
    err.status = 404;
    next(err);
});

app.use((err, req,res,next)=>{
    res.send(err.message);
})

app.listen(process.env.PORT, ()=>
{
    console.log(`Listening port http://localhost:${process.env.PORT}`);
});