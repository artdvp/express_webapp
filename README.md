# Express

## Full stack Web Apps with Vue.js and Node.js

## Request object

- query
    - req.query
- params
    - req.params
- body
    - req.body

## Response object

- send
- status
- redirect

## MVC

- Model
- View
- Controller

## Install package file

```sh
$ npm install pug file-system --save
```

## Install mongoose

```sh
$ npm install mongoose --save
```

## Install Other Package

```sh
$ npm install body-parser nodemon serve-favicon dotenv --save
```

add package to 'app.js'

```js
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config()
const fs = require('file-system');

// var index = require('./routes/index');
// var users = require('./routes/users');

const app = express();

// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(express.static(path.join(__dirname, 'public')));


// add connect mongoose
mongoose.connect(process.env.DB_MONGO, () => {
  console.log('Connection has been made');
})
.catch(err => {
  console.error('App starting error: ', err.stack);
  process,exit(1);
})

// Include controller
fs.readdirSync('controllers').forEach((file) => {
  if(file.substr(-3) == '.js'){
    const route = require('./controllers/' + file)
    route.controller(app)
  }
})
```

## Create models > models/Users.js

for connect to mongoose

```js
const mongoose = require('mongoose')
const Schema = mongoose.Schema;

// validate type
const UserSchema = new Schema({
    name: String,
    email: String
})

const User = mongoose.model("User", UserSchema)
module.exports = User
```

## Create controller > controllers/users.js

```js
const User = require('../models/Users')

module.exports.controller = (app) => {
    //get users page
    app.get('/users', (req, res) => {
        User.fund({}, 'name email', (error, users) => {
            if (error) {
                console.log(error);
            }
            res.send(users)
        })
        // res.render('users', {
        //     title: 'Users',
        //     description: 'This is the description of all the users'
        // })

    })
}
```

## Create users view > views/users.pug

```pug
extends layout

block content
    h1= title
    p Welcome to #{title} - Express
    p #{description}
```

## Add single fetch user mongoose

```js
const User = require('../models/Users')

module.exports.controller = (app) => {
    //get users page
    //.........

    // get a single user details
    app.get('/users/:id', (req, res) => {
        User.findById(req.params.id, 'name email', (error, user) => {
            if(error) {
                console.log(error)
            }
            res.send(user)
        })
    })
}
```

## Add post method to controller

```js
const User = require('../models/Users')

module.exports.controller = (app) => {
    //get users page
    app.get('/users', (req, res) => {
        User.find({}, 'name email', (error, users) => {
            if (error) {
                console.log(error);
            }
            res.send(users)
        })
        // res.render('users', {
        //     title: 'Users',
        //     description: 'This is the description of all the users'
        // })

    })

    // get a single user details
    app.get('/users/:id', (req, res) => {
        User.findById(req.params.id, 'name email', (error, user) => {
            if (error) {
                console.log(error)
            }
            res.send(user)
        })
    })

    // add a new user
    app.post('/users', (req, res) => {
        const user = new User({
            name: req.body.name,
            email: req.body.email
        })
        user.save((error, user) => {
            if (error) {
                console.log(error);
            }
            res.send(user)
        })
    })
}
```

## Test post on postman

> post data 

```json
{
	"name": "Artdvp",
	"email": "dark@gmail.com"
}
```

> result

```json
{
    "_id": "5b78d7d3caef4b17f0b5f075",
    "name": "Artdvp",
    "email": "dark@gmail.com",
    "__v": 0
}
```

