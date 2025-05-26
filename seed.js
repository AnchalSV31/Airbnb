const mongoose = require("mongoose");
const Listing = require("./models/listing"); // Adjust if your model path is different
const {sampleListings} = require("./init/data");
require("dotenv").config();

const dbUrl = process.env.ATLASDB_URL;

async function seedDB() {
  try {
    await mongoose.connect(dbUrl);

    console.log("Connected to MongoDB");

    await Listing.deleteMany({});
    console.log("Old listings cleared");

    await Listing.insertMany(sampleListings);
    console.log("Listings from data.js inserted!");
  } catch (err) {
    console.error("Error seeding data:", err);
  } finally {
    mongoose.connection.close();
  }
}

seedDB();