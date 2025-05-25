const Listing = require("../models/listing");
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapToken = process.env.MAP_TOKEN;
const geocodingClient = mbxGeocoding({accessToken: mapToken});

module.exports.index = async(req, res) => {
    const allListings = await Listing.find({});
    res.render("./listings/index.ejs", {allListings});
};  

module.exports.renderNewForm = (req, res) => {
    res.render("listings/new.ejs");
};

module.exports.showListing = async(req, res) =>{
    let{id} = req.params;
    const listing = await Listing.findById(id)
    .populate({
        path: "reviews",
        populate: {
            path: "author",
        },
    })
    .populate("owner");
    if(!listing){
        req.flash("error", "Listing you requested for does not exist!");
        res.redirect("/listings");
    }
    console.log(listing);
    res.render("listings/show.ejs", {listing});
};

module.exports.createListing = async(req, res, next) => {
    let response = await geocodingClient
    .forwardGeocode({
        query: req.body.listing.location,
        limit: 1
    })
       .send();

    let url = req.file.path;
    let filename = req.file.filename;

    const newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id;
    newListing.image = {url, filename};
    newListing.geometry = response.body.features[0].geometry;
    let savedListing = await newListing.save();
    console.log(savedListing);
    req.flash("success", "New Listing Created!");
    res.redirect("/listings");
};

 module.exports.renderEditForm = async(req, res) => {
    let{id} = req.params;
    const listing = await Listing.findById(id);
    if(!listing){
        req.flash("error", "Listing you requested for does not exist!");
        res.redirect("/listings");
    }
    let originalImageUrl = listing.image.url;
    originalImageUrl = originalImageUrl.replace("/upload", "/upload/w_250");
    res.render("listings/edit.ejs", {listing, originalImageUrl });
};

module.exports.updateListing = async(req, res) =>{
    let {id} = req.params;
    let listing = await Listing.findByIdAndUpdate(id, {...req.body.listing});

    if(typeof req.file !== "undefined"){
    let url = req.file.path;
    let filename = req.file.filename;
    listing.image = {url, filename};
    await listing.save();
    }
    req.flash("success", "Listing Updated!");
    res.redirect(`/listings/${id}`);
};

module.exports.destroyListing = async (req,res) => {
    let {id} = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    req.flash("success", "Listing Deleted!");
    res.redirect("/listings");
};

module.exports.search = async (req, res) => {
    try {
        let searchQuery = req.query.q;
        
        // Check if search query exists and is not empty
        if (!searchQuery || searchQuery.trim() === "") {
            req.flash("error", "Search value cannot be empty!");
            return res.redirect("/listings");
        }

        // Clean up the search query
        searchQuery = searchQuery.trim().replace(/\s+/g, " ");

        let allListings = [];
        let searchType = "";

        // Search by title first
        allListings = await Listing.find({
            title: { $regex: searchQuery, $options: "i" }
        }).populate("owner");

        if (allListings.length > 0) {
            searchType = "title";
        } else {
            // Search by category
            allListings = await Listing.find({
                category: { $regex: searchQuery, $options: "i" }
            }).populate("owner");

            if (allListings.length > 0) {
                searchType = "category";
            } else {
                // Search by location
                allListings = await Listing.find({
                    location: { $regex: searchQuery, $options: "i" }
                }).populate("owner");

                if (allListings.length > 0) {
                    searchType = "location";
                } else {
                    // Search by country
                    allListings = await Listing.find({
                        country: { $regex: searchQuery, $options: "i" }
                    }).populate("owner");

                    if (allListings.length > 0) {
                        searchType = "country";
                    }
                }
            }
        }

        if (allListings.length === 0) {
            req.flash("error", `No listings found for "${searchQuery}"`);
            return res.redirect("/listings");
        }

        req.flash("success", `Found ${allListings.length} listing(s) by ${searchType} for "${searchQuery}"`);
        res.render("listings/index.ejs", { allListings });

    } catch (error) {
        console.error("Search error:", error);
        req.flash("error", "Something went wrong while searching!");
        res.redirect("/listings");
    }
};