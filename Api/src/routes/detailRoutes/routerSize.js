const routerSize = require("express").Router();

const getSize = require("../../controllers/controllersSize/getSize");

routerSize.get('/size', getSize)

module.exports = routerSize;