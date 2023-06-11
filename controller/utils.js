const bcrypt = require("bcrypt")
const saltRounds = 10
// const password = "Admin@123"
const crypto = require('crypto');

async function hashPassword(password){
    
    // return await bcrypt
    // .genSalt(saltRounds)
    // .then(salt => {
    //     console.log('Salt: ', salt)
    //     return bcrypt.hash(password, salt)
    // })
    // .then(hash => {
    //     console.log('Hash: ', hash)
    //     return hash
    // })
    // .catch(err => console.error(err.message))
    return crypto.createHash('md5').update(password).digest("hex");
}

module.exports = { hashPassword }