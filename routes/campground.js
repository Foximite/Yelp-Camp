const express = require("express");
const router = express.Router();
const campgrounds = require("../controllers/campgrounds");
const catchAsync = require("../utils/catchAsync");
const { campgroundSchema } = require("../schemas.js");
const { isLoggedIn } = require("../middleware");
const { validateCampground } = require("../middleware");
const { isAuthor } = require("../middleware");
const multer  = require('multer')
const { storage } = require('../cloudinary');
const upload = multer({ storage })

const Campground = require("../models/campground");

router.route("/")
  .get(catchAsync(campgrounds.index))
  .post(
    isLoggedIn,
    upload.array('image'),
    validateCampground,
    catchAsync(campgrounds.createCampground)
  );


router.get("/new", isLoggedIn, campgrounds.renderNewForm);

router.route("/:id")
  .get(catchAsync(campgrounds.showCampground))
  .put(
    isAuthor,
    upload.array('image'),
    validateCampground,
    catchAsync(campgrounds.updateCampground)
  )
  .delete(isAuthor, catchAsync(campgrounds.deleteCampground));

router.get("/:id/edit",
  isLoggedIn,
  isAuthor,
  catchAsync(campgrounds.renderEditCampground)
);

module.exports = router;
