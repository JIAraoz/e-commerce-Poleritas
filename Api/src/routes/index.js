const router = require('express').Router();

const routerArticle = require('./detailRoutes/routerArticle');
const routerCart = require('./detailRoutes/routerCart');
const routerCategory = require('./detailRoutes/routerCategories');
const routerReview = require('./detailRoutes/routerReview');
const routerUser = require('./detailRoutes/routerUser');
const routerAdmin=require('./detailRoutes/routerAdmin')

router.use('/user', routerUser);
router.use('/article', routerArticle);
router.use('/categories', routerCategory);
router.use('/cart', routerCart);
router.use('/review', routerReview);
router.use('/admin', routerAdmin)

module.exports = router;