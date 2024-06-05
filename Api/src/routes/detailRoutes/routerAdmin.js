const routerAdmin = require("express").Router();

const ChangeRol=require('../../controllers/controllersAdmin/ChangeRol')
const ChangeStatusArticle=require("../../controllers/controllersAdmin/ChangeStatusArticle")

routerAdmin.post('/ChangeRol',ChangeRol)
routerAdmin.post('/ChangeStatusArticle',ChangeStatusArticle)


module.exports = routerAdmin;