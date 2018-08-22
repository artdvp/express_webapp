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

/*
{
	"name": "Artdvp",
	"email": "dark@gmail.com"
}

// data
{
    "_id": "5b78d7d3caef4b17f0b5f075",
    "name": "Artdvp",
    "email": "dark@gmail.com",
    "__v": 0
}
*/