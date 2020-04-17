const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const passport = require('passport');
const session = require('express-session');
const cookieSession = require('cookie-session');
const keys = require('../config/keys');
const flash = require('connect-flash');


require('../config/passport')(passport);
const userRouter = require('./routes/users');

const app = express();
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/Intern',{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useFindAndModify:false
}).then(()=> console.log("MongoDB connected"))
  .catch(err => console.log(err));

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));

app.use(cookieSession({
    maxAge: 24*60*60*1000,
    keys: [keys.session.cookieKey]
}));

app.use(session({
  secret: 'witsyIntern',
  resave: false,
  saveUninitialized: true,
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use((req,res,next)=>{
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error = req.flash('error');

    next();
})
app.use('/users',userRouter);
app.get('/',(req,res)=>{
    res.render('index');
})

const publicDirectoryPath = path.join(__dirname,'../public');
app.use(express.static(publicDirectoryPath));



const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("server started on PORT :", PORT);    
})