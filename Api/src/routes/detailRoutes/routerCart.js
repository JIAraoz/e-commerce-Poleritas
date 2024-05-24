const getShoppingCart=require('../../controllers/controllersCart/getShoppingCart')
const desactivateShoppingCart=require('../../controllers/controllersCart/desactivateShoppingCart')
const routerCart = require("express").Router();
routerCart.get('/getShoppingCart',getShoppingCart)
routerCart.get('/desactivateShoppingCart',desactivateShoppingCart)
module.exports = routerCart;