const routerArticle = require("express").Router();

const getById = require("../../controllers/controllersArticles/getById");
const getFill = require("../../controllers/controllersArticles/getFill");
const postCreateArticle = require("../../controllers/controllersArticles/postCreateArticle");



routerArticle.get('/articles', getFill)
routerArticle.get('/detail/:id', getById)
routerArticle.post('/createArticle',postCreateArticle)

module.exports = routerArticle;