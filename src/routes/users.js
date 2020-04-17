const express = require('express');
const userRouter = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const { ensureAuthenticated } = require('../../config/auth');
const passport = require('passport');


userRouter.post('/signup',(req,res)=>{
    //console.log("req.body ",req.body);
    const {name,email,password,phone} = req.body;
    User.findOne({ email: email })
        .then(user => {
                if(user) {
                    //user exists
                    req.flash('error', 'Email Id already exists');
                    res.redirect('/');  
                }else{
                    //save the new user in the database
                    const newUser = new User({
                        name,
                        email,
                        password,
                        phone
                    });
                    bcrypt.genSalt(10, (err, salt) => {
                        bcrypt.hash(newUser.password, salt, (err, hash) => {
                          if (err) throw err;
                          newUser.password = hash;
                            newUser.save()
                                .then(user => {
                                console.log("New user: ",user);
                                //req.flash('success_msg','Successfuly registered, verify your account at email');
                                req.flash('success_msg', 'You are now registered and can log in');   
                                //to display the flash message we will use messages.ejs in partials
                                
                                //redirect to login page
                                res.redirect('/users/login');
                                })
                                .catch(err => console.log(err));                    
                        });
                    })
                }
            })
            .catch(err => console.log(err));
      
});

userRouter.get('/login',(req,res)=>{
    res.render('login');
})

userRouter.post('/login', (req,res,next)=> {
    passport.authenticate('local', {
        successRedirect: '/users/profile',
        failureRedirect: '/users/login',
        failureFlash : true
    })(req,res,next);
});

userRouter.get('/profile',ensureAuthenticated,(req,res)=>{
    res.render('profile',{
        list:req.user
    })
});

userRouter.post('/update/:id',ensureAuthenticated,(req,res)=>{
    const id = req.params.id;
    User.findById(id)
        .then(user =>{
            if(!user){
                req.flash('error', 'User Records does not exists');
                res.redirect('/users/login');
            }else{
                if(req.query.change == 'edit'){
                    user.name = req.body.name;
                    user.phone = req.body.phone;
                    user.email = req.body.email;
                    user.password = req.body.password;
                }else if(req.query.change == 'add'){
                    user.address = req.body.address;
                    user.city = req.body.city;
                    user.state = req.body.state;
                }
                
                user.save()
                .then(data=>{
                    req.flash('success_msg', 'Data updated');
                    res.redirect('/users/profile');
                }).catch(e=>{
                    res.redirect('/users/profile');
                })
            }
        })
})

userRouter.get('/logout', ensureAuthenticated,(req,res)=>{
    req.logout();
    req.flash('success_msg', 'You are logged out');
    res.redirect('/users/login');
});

module.exports = userRouter;
