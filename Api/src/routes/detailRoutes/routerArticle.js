const routerArticle = require("express").Router();

const getById = require("../../controllers/controllersArticles/getById");
const getFill = require("../../controllers/controllersArticles/getFill");
const postCreateArticle = require("../../controllers/controllersArticles/postCreateArticle");
const editArticle = require("../../controllers/controllersArticles/editArticle");



routerArticle.get('/articles', getFill)
routerArticle.get('/detail/:id', getById)
routerArticle.post('/createArticle',postCreateArticle)
routerArticle.post('/editArticle', editArticle)

module.exports = routerArticle;