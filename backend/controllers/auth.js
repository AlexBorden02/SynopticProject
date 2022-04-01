const User = require('../models/user.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const {
   createJWT,
} = require("../utils/auth");
const decode = require('jwt-decode')

// Signin route
exports.signin = (req, res) => {
    let { name, password } = req.body;

    // Checks for users in the credentials collection, using the user model
    User.findOne({ name: name }).then(user => {
        // If no user if found then the user does not exist and an error is returned
        if (!user) {
            return res.status(404).json({
                errors: [{ user: "not found" }],
            });
        } else {
            // If the user is found then the password is checked, if it matches, it returns successful and the user is authed
            bcrypt.compare(password, user.password).then(isMatch => {
                if (!isMatch) {
                    return res.status(400).json({ errors: [{ password:"incorrect" }] });
                }
                let access_token = createJWT(
                        user.name,
                        user._id,
                        1800
                );
                jwt.verify(access_token, process.env.TOKENSECRET, (err,decoded) => {
                    if (err) {
                        res.status(500).json({ errors: err });
                    }
                    if (decoded) {
                        return res.status(200).json({
                            success: true,
                            token: access_token,
                            message: user
                        });
                    }
                });
            }).catch((err) => {
                return res.status(404).json({
                    errors: [{ user: "not found" }],
                });
            });
        }
    }).catch(err => {
        res.status(500).json({ erros: err });
    });
}

// Authentication route
exports.authenticate = (req, res, next) => {
    // Checks the token from the request and if it is expired, it returns false
    jwt.verify(req.body.token, process.env.TOKENSECRET, function(err, decoded){
        if(err){
            return res.json({authed: false});
        }
    })

    let jwtToken = decode(req.body.token)

    try {
        if (jwtToken.exp < new Date().getTime() / 1000) {
          return res.json({authed: false});
        }
        else{
            return res.status(200).json({authed: true})
        }
    
      } catch (e) {
        return res.json({authed: false});
      }
    
}

exports.signup = (req, res, next) => {
    let { name, password } = req.body;
    User.findOne({name: name})
        .then(user=>{
            if(user){
                return res.status(422).json({ errors: [{ user: "email already exists" }] });
            }else {
                const user = new User({
                    name: name.toLowerCase(),
                    password: password,
                });
                bcrypt.genSalt(10, function(err, salt) { bcrypt.hash(password, salt, function(err, hash) {
                    if (err) throw err;
                        user.password = hash;
                        user.save()
                            .then(response => {
                                res.status(200).json({
                                    success: true,
                                    result: response
                                })
                            })
                        .catch(err => {
                            res.status(500).json({
                                errors: [{ error: err }]
                            });
                        });
                    });
                });
            }
        }).catch(err =>{
            res.status(500).json({
                errors: [{ error: 'Something went wrong' }]
            });
        })
}