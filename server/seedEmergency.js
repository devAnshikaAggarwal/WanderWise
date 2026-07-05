require("dotenv").config();
const mongoose = require("mongoose");
const Emergency = require("./models/Emergency");

const data = [
  {
    country: "India",
    policeNo: "100",
    ambulanceNo: "102",
    fireNo: "101",
    touristHelpline: "1363",
  },
  {
    country: "Indonesia",
    policeNo: "110",
    ambulanceNo: "118",
    fireNo: "113",
    touristHelpline: "0361-759687",
  },
  {
    country: "Greece",
    policeNo: "100",
    ambulanceNo: "166",
    fireNo: "199",
    touristHelpline: "1571",
  },
  {
    country: "Japan",
    policeNo: "110",
    ambulanceNo: "119",
    fireNo: "119",
    touristHelpline: "050-3816-2787",
  },
  {
    country: "Maldives",
    policeNo: "119",
    ambulanceNo: "102",
    fireNo: "118",
    touristHelpline: "1682",
  },
  {
    country: "France",
    policeNo: "17",
    ambulanceNo: "15",
    fireNo: "18",
    touristHelpline: "112",
  },
  {
    country: "UAE",
    policeNo: "999",
    ambulanceNo: "998",
    fireNo: "997",
    touristHelpline: "800-424",
  },
  {
    country: "Switzerland",
    policeNo: "117",
    ambulanceNo: "144",
    fireNo: "118",
    touristHelpline: "112",
  },
  {
    country: "USA",
    policeNo: "911",
    ambulanceNo: "911",
    fireNo: "911",
    touristHelpline: "911",
  },
  {
    country: "Turkey",
    policeNo: "155",
    ambulanceNo: "112",
    fireNo: "110",
    touristHelpline: "153",
  },
];

async function run() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log("Connected to MongoDB");

  for (const entry of data) {
    const res = await Emergency.updateOne(
      { country: entry.country },
      { $set: entry },
      { upsert: true },
    );
    console.log(
      `✔ ${entry.country} ${res.upsertedCount ? "(added)" : "(updated)"}`,
    );
  }

  await mongoose.disconnect();
  console.log("Done ✅");
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
