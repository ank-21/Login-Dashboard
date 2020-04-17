const localStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../src/models/User');


module.exports = function(passport) {
    passport.use(
        new localStrategy({usernameField: 'email'}, (email, password, done) => {
            //Match user
            User.findOne({ email })
                .then(user => {
                    if(!user){
                        return done(null, false , { message: 'Email is not registered' });
                    }

                    //so if user exists we have to match the password

                    bcrypt.compare(password, user.password, (err,isMatch) => {
                        if (err){
                            return done(null,false, {message: 'Try again!'});
                        }

                        if(isMatch){
                            console.log("here i am");
                            
                            return done(null,user);
                        }else{
                            console.log("dfbhdf");
                            
                            return done(null,false, {message: 'Incorrect Password!'});
                        }
                    })

                })
                .catch(err => console.log(err));
        })
    );       
  

    passport.serializeUser((user, done) => {
        done(null, user.id);
      });
      
    passport.deserializeUser((id, done) => {
            User.findById(id, (err, user)=> {
                done(err, user);
              });
        
    });
}

