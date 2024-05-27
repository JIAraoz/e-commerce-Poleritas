const router = require('express').Router();

const routerArticle = require('./detailRoutes/routerArticle');
const routerCart = require('./detailRoutes/routerCart');
const routerCategory = require('./detailRoutes/routerCategories');
const routerReview = require('./detailRoutes/routerReview');
const routerSize = require('./detailRoutes/routerSize');
const routerUser = require('./detailRoutes/routerUser');

router.use('/user', routerUser);
router.use('/article', routerArticle);
router.use('/categories', routerCategory);
router.use('/size', routerSize);
router.use('/cart', routerCart);
router.use('/review', routerReview);

module.exports = router;