const routerSize = require("express").Router();

const getSize = require("../../controllers/controllersSize/getSize");

router.get('/size', getSize)

module.exports = routerSize;