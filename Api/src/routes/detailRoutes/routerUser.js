const routerUser = require("express").Router();
const postUser=require('../../controllers/controllersUser/postUser')
routerUser.post('/postUser',postUser)
module.exports = routerUser;