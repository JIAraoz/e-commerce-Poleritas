const getShoppingCart=require('../../controllers/controllersCart/getShoppingCart')
const desactivateShoppingCart=require('../../controllers/controllersCart/desactivateShoppingCart');
const addArticleCart = require('../../controllers/controllersCart/addArticleCart');
const removeArticleCart = require('../../controllers/controllersCart/removeArticleCart');
const cleanShoppingCart = require('../../controllers/controllersCart/cleanShoppingCart');
const checkoutCart = require('../../controllers/controllersCart/checkoutCart');
const routerCart = require("express").Router();

routerCart.get('/getShoppingCart',getShoppingCart);
routerCart.post('/add_article_cart', addArticleCart);
routerCart.get('/remove_article_cart', removeArticleCart);
routerCart.get('/desactivateShoppingCart', desactivateShoppingCart);
routerCart.get('/cleanShoppingCart', cleanShoppingCart);
routerCart.post('/checkout', checkoutCart);

module.exports = routerCart;