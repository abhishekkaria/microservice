var express = require('express');
var router = express.Router();
const user = require("../controller/users.js")
const mu = require("../middleware/user")

/* GET users listing. */
router.post('/login', mu.validateLoginBody ,user.Login);
router.post('/register', mu.validateRegisterBody , user.Register);

module.exports = router;
