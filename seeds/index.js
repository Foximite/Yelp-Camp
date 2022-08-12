const mongoose = require("mongoose");
const Campground = require("../models/campground");
const cities = require("./cities");
const { places, descriptors } = require("./seedHelpers");
main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://localhost:27017/campgrounds");
}
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", () => {
  console.log("Database connected");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 300; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      //Your User ID
      author: "62e39566d0d37f7371add336",
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      description:
        "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Odit id, magnam corrupti nostrum eum eligendi iusto animi aliquam nisi voluptates eaque fugiat eos quisquam fuga mollitia repellat qui maiores! Vel!",
      price,
      geometry: { 
        type: "Point", 
        coordinates: [
        cities[random1000].longitude, 
        cities[random1000].latitude,
      ] 
      },
      images: [
        {
          url: "https://res.cloudinary.com/dcuzawzwx/image/upload/v1659601737/YelpCamp/zw0tgvnncilwglxpszjl.jpg",
          filename: "YelpCamp/zw0tgvnncilwglxpszjl",
        },
        {
          url: "https://res.cloudinary.com/dcuzawzwx/image/upload/v1659601741/YelpCamp/qegmavt8bau8yf8nfuqk.jpg",
          filename: "YelpCamp/qegmavt8bau8yf8nfuqk",
        },
      ],
    });
    console.log(`${cities[random1000].city}, ${cities[random1000].state}`);
    await camp.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
