const express = require('express')
const router = express.Router({mergeParams: true})
const catchAsync = require('../utils/catchAsync');
const reviews = require('../controllers/reviews')


const {validateReview, isLoggedIn, isReviewAuthor} = require('../middlware');


router.post('/', isLoggedIn, validateReview, catchAsync(reviews.post))

router.delete('/:reviewId', isLoggedIn, isReviewAuthor, catchAsync(reviews.delete))

module.exports = router;