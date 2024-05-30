const routerReview = require("express").Router();

const { getReviewsController } = require('../../controllers/controllersReview/getReviews');
const { createReviewController } = require('../../controllers/controllersReview/postReviews');
const { updateReviewController } = require('../../controllers/controllersReview/putReview');

router.put('/reviews/:reviewId', updateReviewController);
router.post('/reviews', createReviewController);
router.get('/reviews/:productId', getReviewsController);

module.exports = routerReview;