const routerReview = require("express").Router();

const getAllReviews = require("../../controllers/controllersReview/getAllReviews");
const getReviews = require('../../controllers/controllersReview/getReviews');
const postReviews = require('../../controllers/controllersReview/postReviews');
const updateReview = require('../../controllers/controllersReview/putReview');

routerReview.get('/reviews_list', getAllReviews);
routerReview.put('/reviews/:reviewId', updateReview);
routerReview.post('/reviews', postReviews);
routerReview.get('/reviews/:userId', getReviews);

module.exports = routerReview;