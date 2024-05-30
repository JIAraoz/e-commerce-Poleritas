const routerUser = require("express").Router();

const getUserByEmail = require("../../controllers/controllersUser/getUserByEmail");
const getUser = require("../../controllers/controllersUser/getUsers");
const postUser = require("../../controllers/controllersUser/postUser");
const editUser = require("../../controllers/controllersUser/editUser");

routerUser.get("/user_email", getUserByEmail);
routerUser.get("/list-users", getUser);
routerUser.post("/postUser", postUser);
routerUser.get("/editUser", editUser);

module.exports = routerUser;
