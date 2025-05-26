const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const {isLoggedIn, isOwner, validateListing} = require("../middleware.js");
const listingController = require("../controllers/listing.js");
const multer = require("multer");
const {storage} = require("../cloudConfig.js");
const upload = multer({storage});

router
  .route("/")
  .get(wrapAsync(listingController.index))
  .post(
    isLoggedIn,
    
    upload.single("listing[image]"),
    validateListing,
    wrapAsync(listingController.createListing)
  );

//New Route
router.get("/new", isLoggedIn, listingController.renderNewForm);

// Filter route - handles /listings/filter/:category
// router.get("/filter/:category", wrapAsync(listingController.filterListings));

// In your routes file
router.get("/filter/:category", async (req, res) => {
    try {
        const { category } = req.params;
        
        // Decode URL-encoded category names (like "Iconic%20cities" becomes "Iconic cities")
        const decodedCategory = decodeURIComponent(category);
        
        console.log("Filtering by category:", decodedCategory); // Debug log
        
        // Find listings that match the category
        const listings = await Listing.find({ category: decodedCategory });
        
        console.log("Found listings:", listings.length); // Debug log
        
        res.render("listings/index", { 
            allListings: listings, // Note: using allListings to match your template
            q: decodedCategory // For the heading
        });
        
    } catch (err) {
        console.error("Filter error:", err);
        req.flash("error", "Something went wrong with filtering!");
        res.redirect("/listings");
    }
});

//Search
router.get("/search", listingController.search);

router
  .route("/:id")
  .get(wrapAsync(listingController.showListing))
  .put(
    isLoggedIn,
    isOwner,
    upload.single("listing[image]"),
    validateListing, wrapAsync(listingController.updateListing))
  .delete(
    isLoggedIn, 
    isOwner,
    wrapAsync(listingController.destroyListing)
  );

//Edit route
router.get("/:id/edit",
  isLoggedIn,
  isOwner,
  wrapAsync(listingController.renderEditForm));


module.exports= router;