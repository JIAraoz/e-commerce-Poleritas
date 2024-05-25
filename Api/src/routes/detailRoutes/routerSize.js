const routerSize = require("express").Router();
const postSize=require("../../controllers/controllersSize/postSize")
const getSize = require("../../controllers/controllersSize/getSize");

routerSize.get('/size', getSize)
routerSize.post('/size',postSize)

module.exports = routerSize;