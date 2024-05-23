const routerArticle = require("express").Router();

const getById = require("../../controllers/controllersArticles/getById");
const getFill = require("../../controllers/controllersArticles/getFill");
const postCreateArticle = require("../../controllers/controllersArticles/postCreateArticle");
const postFill = require('../controllers/controllersArticles/postFill');

router.post('/fill',postFill)
router.get('/articles', getFill)
router.get('/detail/:id', getById)
router.post('/createArticle',postCreateArticle)

module.exports = routerArticle;