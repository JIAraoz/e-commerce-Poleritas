const routerUser = require("express").Router();

const getUser = require("../../controllers/controllersUser/getUsers");
const postUser=require('../../controllers/controllersUser/postUser')

routerUser.get('/list-users', getUser);
routerUser.post('/postUser',postUser)

module.exports = routerUser;