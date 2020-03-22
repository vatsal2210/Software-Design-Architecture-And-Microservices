const User = require('../models/user');
const {
    validationResult
} = require("express-validator/check");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require('../config/config');

/* Signup */
exports.signup = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        let error = new Error(errors.array());
        error.status = 202;
        throw error;
    }

    const firstName = req.body.firstName,
        lastName = req.body.lastName,
        email = req.body.email,
        password = req.body.password,
        hashedPw = bcrypt.hashSync(password, 12);

    User
        .findOne({
            email: email
        })
        .then(data => {
            console.log('Signup data ', data);
            if (data) {
                let error = new Error(`A user with this email is already registered.`);
                res.send({
                    code: 500,
                    message: `A user with this email is already registered.`
                });
            } else {
                const user = new User({
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    password: hashedPw
                });
                user.save()
                    .then(data => {
                        console.log(data);
                        res.send({
                            code: 200,
                            message: `${firstName}, your account is created successfully!.`
                        });
                    })
                    .catch(err => {
                        console.error(err);
                        res.send({
                            code: 500,
                            message: 'Something went wrong. Try again!'
                        });
                    })
            }
        })
        .catch(err => {
            console.error(err);
            res.send({
                code: 500,
                message: 'Something went wrong. Try again!'
            });
        })
};

/* Signin */
exports.signin = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        let message = "";
        for (let i = 0; i < errors.array().length; i++) {
            message = message + errors.array()[i].msg + " ";
        }
        let error = new Error(message);
        error.status = 202;
        throw error;
    }

    const email = req.body.email,
        password = req.body.password;

    User.findOne({
            email: email
        })
        .then(user => {
            console.log('login user ', user);
            if (!user) {
                console.log("User not found");
                res.send({
                    code: 500,
                    message: "A user with this email could not be found."
                });
            } else {
                const isEqual = bcrypt.compareSync(password, user.password);
                if (!isEqual) {
                    console.log('Password is incorrect!');
                    return res.send({
                        code: 500,
                        message: "Password is incorrect!"
                    });
                }

                const token = jwt.sign({
                        email: user.email,
                        userId: user.id
                    },
                    config.JWT.JWT_ENCRYPTION, {
                        expiresIn: config.JWT.JWT_EXPIRATION
                    }
                );
                res.status(200).json({
                    code: 200,
                    token: token,
                    name: user.firstName + ' ' + user.lastName
                });
            }
        })
        .catch(err => {
            console.error(err);
            return res.send({
                code: 500,
                message: "Password is incorrect!"
            });
        })
};

exports.verify = (req, res, next) => {
    const token = req.body.token;

    if (!token) {
        return res.send({
            code: 401,
            message: "Not authenticated."
        });
    }

    let decodedToken;
    try {
        decodedToken = jwt.verify(token, config.JWT.JWT_ENCRYPTION);
    } catch (error) {
        return res.send({
            code: 401,
            message: "Not authenticated."
        });
    }
    if (!decodedToken) {
        return res.send({
            code: 401,
            message: "Not authenticated."
        });
    }
    console.log("decodedToken ", decodedToken);
    const userId = decodedToken.userId;
    res.send({
        code: 200,
        message: userId
    });
}