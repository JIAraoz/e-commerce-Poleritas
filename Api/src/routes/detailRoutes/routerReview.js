const routerReview = require("express").Router();

const getReviews = require('../../controllers/controllersReview/getReviews');
const postReviews = require('../../controllers/controllersReview/postReviews');
const updateReview = require('../../controllers/controllersReview/putReview');

routerReview.put('/reviews/:reviewId', updateReview);
routerReview.post('/reviews', postReviews);
routerReview.get('/reviews/:userId', getReviews);

module.exports = routerReview;