const routerAdmin = require("express").Router();

const ChangeRol=require('../../controllers/controllersAdmin/ChangeRol')


routerAdmin.post('/ChangeRol',ChangeRol)


module.exports = routerAdmin;