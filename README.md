# Login Dashoard


This is a simple REST API server implementation built on top of Node.js, Express.js with Mongoose.js for MongoDB integration. For user benefits messages have been displayed using flash messages using dependency connect-flash
The user will enter the details in the form regarding their details and will get their details in the dashboard page.

## Getting Started
```bash
mdkir -p ~/Desktop/Witsy-Internship
cd ~/Desktop/Witsy-Internship
git clone https://github.com/ank-21/Login Dashboard
```

## Prerequisites
You need to have npm and Node.js, and MongoDB installed.

## Run Server
```bash
 # Install all dependencies
    npm install

# Start the server
    npm run dev
 ```
 
## Base URI for making requests
```bash
 http://localhost:3000/
```
 ## Routes
 
 ### POST Request
 ```bash
 http://localhost:3000/users/signup
 ```
 This route will allow user to fill his/her details with basic information like Name, Email Id, Mobile Number, Password and save all these fields in database
 The password is save after encrypting the password using npm dependency bcryptjs.
 
 ### GET Request
 ```bash
 http://localhost:3000/users/login
 ```
 This route will redirect user to login page.

 
 ### POST Request
 ```bash
 http://localhost:3000/users/login
 ```
 This route will allow user to logged in the system with a mail id and the password as set while signing up. They will be redirect to dashboard url. Here User Authentication is monitored by using Passport Local Strategy.


 ### GET Request
 ```bash
 http://localhost:3000/users/profile
 ```
 This route will display the profile page to the user.The user will get all the details in table form. In this page the user can edit, add the data as well as logout from the system too.

 ### GET Request
 ```bash
 http://localhost:3000/users/update/:id
 ```
 This route will allow users to update the data and send them back to profile dashboard
 
  ### GET Request
 ```bash
 http://localhost:3000/users/logout
 ```
 This route will allow users to logout from the system and redirect them to login page

 
 ## Workflow
 The User will fill the Signup form by entering basic details.
 All the details will then be saved in the database and the user will be redirected to login page.
 The user need to login by filling the email id and password and on successful submission they will be redirected to dashboard page.
 The User will get the details in a tabular format.
 The USer can add details,edit details or can logout from the system.
 
 
## Dependencies Installed
express- A framework for nodejs <br />
ejs - A template engine used for front end<br />
mongoose - Used as database for storing data<br />
passport - used for authentication<br />
passport-local - used for storing user details in cookies and used this strategy for authentication<br />
validator - for validating email while saving to database<br />
connect-flash - for displaying flash message<br />
cookie-session - stores the session data on the client within a cookie<br />
express-session - Create a session middleware<br />
nodemon - used as a dev dependency to update the server continuously<br />

 
