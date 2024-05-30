const routerReview = require("express").Router();

const getReviews = require('../../controllers/controllersReview/getReviews');
const postReviews = require('../../controllers/controllersReview/postReviews');
const updateReview = require('../../controllers/controllersReview/putReview');

router.put('/reviews/:reviewId', updateReview);
router.post('/reviews', postReviews);
router.get('/reviews/:productId', getReviews);

module.exports = routerReview;