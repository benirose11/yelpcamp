const express = require('express')
const router = express.Router()
const catchAsync = require('../utils/catchAsync');
const campgrounds = require('../controllers/campgrounds')
const multer  = require('multer');
const {storage} = require('../cloudinary')
const upload = multer({storage});


// our function to check that a user is logged in
const {isLoggedIn, isAuthor, validateCampground} = require('../middlware');

router.route('/')
    .get(catchAsync(campgrounds.renderIndex))
    .post(isLoggedIn, upload.array('image'), validateCampground, catchAsync(campgrounds.new))
    

router.get('/new', isLoggedIn, campgrounds.renderNewForm)

router.route('/:id')
    .get(catchAsync(campgrounds.renderDetails))
    .put(isLoggedIn, isAuthor, upload.array('image'), validateCampground, catchAsync(campgrounds.update))
    .delete(isAuthor, catchAsync(campgrounds.delete))


    
router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(campgrounds.renderEdit))

module.exports = router;