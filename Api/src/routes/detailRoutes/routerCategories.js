const routerCategory = require("express").Router();

const getCategory = require("../../controllers/controllersCategory/getCategory");
const postCategory = require("../../controllers/controllersCategory/postCategory");

router.get('/category',getCategory)

router.post('/category',postCategory)

module.exports = routerCategory