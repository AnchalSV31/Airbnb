const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

require("dotenv").config(); 

const MONGO_URL = process.env.MONGO_URL; 

main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}

const initDB = async () => {
  // Debug: Check what's in initData
  console.log("initData:", initData);
  console.log("initData.sampleListings:", initData.sampleListings);
  
  await Listing.deleteMany({}); // Clear existing data
  
  // Check if sampleListings exists before using it
  if (!initData.sampleListings) {
    console.error("Error: sampleListings not found in data.js");
    return;
  }
  
  // Add default owner to all listings if needed
  initData.sampleListings = initData.sampleListings.map((obj) => ({
    ...obj,
    owner: "someUserId", // Add if you have user authentication
  }));
  
  await Listing.insertMany(initData.sampleListings);
  console.log("Data was initialized with categories");
};

initDB();