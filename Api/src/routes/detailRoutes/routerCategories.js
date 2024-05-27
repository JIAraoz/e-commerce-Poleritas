const routerCategory = require("express").Router();

const getCategory = require("../../controllers/controllersCategory/getCategory");
const postCategory = require("../../controllers/controllersCategory/postCategory");

routerCategory.get('/category',getCategory)

routerCategory.post('/category',postCategory)

module.exports = routerCategory