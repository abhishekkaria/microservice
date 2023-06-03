const Joi = require('joi')
const User = require('../models/user')

// schema options
const options = {
    abortEarly: false, // include all errors
    allowUnknown: true, // ignore unknown props
    stripUnknown: true // remove unknown props
};


exports.validateLoginBody = function(req,res,next)
{
    const schema = Joi.object({
        email: Joi.string().email().required().lowercase(),
        password: Joi.string().required(),    
    });
    
    // validate request body against schema
    const { error, value } = schema.validate(req.body, options);
        
    if (error) {        
        // res.json({success:false,message:`Validation error: ${error.details.map(x => x.message).join(', ')}`})        
        res.status(400).json({
            success:false,
            error : {
                code : 4000,
                message:`Validation error: ${error.details.map(x => x.message).join(', ')}`
            }            
        })
    } else {
        // on success replace req.body with validated value and trigger next middleware function
        req.body = value;
        next();
    }
}

exports.validateRegisterBody = async function(req,res,next)
{
    const schema = Joi.object({
        email: Joi.string().email().required().lowercase(),
        username: Joi.string().required(),
        password: Joi.string().required(),    
    });
    
    // validate request body against schema
    const { error, value } = schema.validate(req.body, options);
        
    if (error) {        
        // res.json({success:false,message:`Validation error: ${error.details.map(x => x.message).join(', ')}`})        
        res.status(400).json({
            success:false,
            error : {
                code : 4000,
                message:`Validation error: ${error.details.map(x => x.message).join(', ')}`
            }            
        })
    } else {

        const user = User.findOne({email:req.body.email})
        
        if(user)
            return res.status(400).json({
                success:false,
                error : {
                    code : 4000,
                    message:`email already userd...!!!`
                }            
            })  
        // on success replace req.body with validated value and trigger next middleware function
        req.body = value;
        next();
    }
}

