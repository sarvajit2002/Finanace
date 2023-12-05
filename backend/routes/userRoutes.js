const express = require('express')

const {loginController,registerController,authcontroller,getAllUsersController} = require('../controller/userController')
const router = express.Router()
const authMiddleware = require('../middleware/auth')

router.post('/login',loginController)
router.post('/register',registerController)
router.get('/getuser',authMiddleware,authcontroller)
router.get('/allusers',getAllUsersController)

module.exports=router