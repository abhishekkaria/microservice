const User = require("../models/user")
const utils = require("./utils")

async function Login (req,res){      
    const user = await User.findOne({email:req.body.email,password : await utils.hashPassword(req.body.password)})    
    res.json({"user":user})
}

async function Register(req,res){       
    const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: await utils.hashPassword(req.body.password),
    })

    await user.save()
    res.status(201)
    res.json({"success":"true"})
}

module.exports = { Login , Register}