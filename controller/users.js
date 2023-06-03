const User = require("../models/user")
const utils = require("./utils")

const bcrypt = require("bcrypt")
const saltRounds = 10

async function Login (req,res){        
    const user = await User.findOne({});
    res.json({"users":user})
}

async function Register(req,res){
       
    const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: await utils.hashPassword(req.body.password),
    })

    await user.save()

    res.json({"success":"true"})
}

module.exports = { Login , Register }