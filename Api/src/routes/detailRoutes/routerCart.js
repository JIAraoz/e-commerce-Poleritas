const getShoppingCart=require('../../controllers/controllersCart/getShoppingCart')
const routerCart = require("express").Router();
routerCart.get('/getShoppingCart',getShoppingCart)
module.exports = routerCart;