require("dotenv").config();
const mongoose = require("mongoose");
const Destination = require("./models/Destination");

const U = (id) =>
  `https://images.unsplash.com/photo-${id}?w=900&q=80&auto=format&fit=crop`;

// image updates for existing destinations (matched by name)
const imageUpdates = {
  Bali: U("1537996194471-e657df975ab4"),
  Santorini: U("1613395877344-13d4a8e0d49e"),
  Kyoto: U("1493976040374-85c8e12f0c0e"),
  Maldives: U("1514282401047-d79a71a590e8"),
  Rajasthan: U("1477587458883-47145ed94245"),
  Paris: U("1502602898657-3e91760cbb34"),
  Manali: U("1626621341517-bbf3d9990a23"),
  Dubai: U("1512453979798-5ea266f8880c"),
};

// new destinations to add
const newDestinations = [
  {
    name: "Swiss Alps",
    country: "Switzerland",
    description:
      "Snow-capped peaks, alpine villages and scenic train rides through breathtaking mountain landscapes.",
    image: U("1531366936337-7c912a4589a7"),
    bestTime: "December to March",
    climate: "Alpine",
    coordinates: { lat: 46.8182, lng: 8.2275 },
    photos: [],
  },
  {
    name: "New York",
    country: "USA",
    description:
      "The city that never sleeps — iconic skyline, Broadway shows, Central Park and world-class museums.",
    image: U("1496442226666-8d4d0e62e6e9"),
    bestTime: "April to June",
    climate: "Temperate",
    coordinates: { lat: 40.7128, lng: -74.006 },
    photos: [],
  },
  {
    name: "Cappadocia",
    country: "Turkey",
    description:
      "Surreal rock formations, cave hotels and sunrise hot air balloon rides over fairy chimneys.",
    image: U("1641128324972-af3212f0f6bd"),
    bestTime: "April to June",
    climate: "Semi-arid",
    coordinates: { lat: 38.6431, lng: 34.8289 },
    photos: [],
  },
  {
    name: "Goa",
    country: "India",
    description:
      "Golden beaches, Portuguese heritage, vibrant nightlife and laid-back coastal charm.",
    image: U("1512343879784-a960bf40e7f2"),
    bestTime: "November to February",
    climate: "Tropical",
    coordinates: { lat: 15.2993, lng: 74.124 },
    photos: [],
  },
];

async function run() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log("Connected to MongoDB");

  // 1) update images on existing destinations
  for (const [name, image] of Object.entries(imageUpdates)) {
    const res = await Destination.updateOne({ name }, { $set: { image } });
    console.log(
      res.matchedCount
        ? `✔ Updated image: ${name}`
        : `✖ Not found (skipped): ${name}`,
    );
  }

  // 2) insert new destinations (skip if name already exists)
  for (const dest of newDestinations) {
    const exists = await Destination.findOne({ name: dest.name });
    if (exists) {
      console.log(`• Already exists (skipped): ${dest.name}`);
    } else {
      await Destination.create(dest);
      console.log(`✔ Added: ${dest.name}`);
    }
  }

  await mongoose.disconnect();
  console.log("Done ✅");
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
