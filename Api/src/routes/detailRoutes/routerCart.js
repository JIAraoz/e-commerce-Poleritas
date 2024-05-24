const getShoppingCart=require('../../controllers/controllersCart/getShoppingCart')
const desactivateShoppingCart=require('../../controllers/controllersCart/desactivateShoppingCart');
const addArticleCart = require('../../controllers/controllersCart/addArticleCart');
const removeArticleCart = require('../../controllers/controllersCart/removeArticleCart');
const routerCart = require("express").Router();

routerCart.get('/getShoppingCart',getShoppingCart);
routerCart.get('/add_article_cart', addArticleCart);
routerCart.get('/remove_article_cart', removeArticleCart);
routerCart.get('/desactivateShoppingCart',desactivateShoppingCart);

module.exports = routerCart;