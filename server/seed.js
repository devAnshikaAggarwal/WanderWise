const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Destination = require('./models/Destination');

dotenv.config();

const sampleDestinations = [
  { name: 'Bali', country: 'Indonesia', description: 'A tropical paradise known for its beaches, temples, and vibrant culture.', image: '', bestTime: 'April to October', climate: 'Tropical', photos: [], coordinates: { lat: -8.3405, lng: 115.0920 } },
  { name: 'Santorini', country: 'Greece', description: 'Famous for its white-washed buildings, blue domes, and stunning sunsets.', image: '', bestTime: 'June to September', climate: 'Mediterranean', photos: [], coordinates: { lat: 36.3932, lng: 25.4615 } },
  { name: 'Kyoto', country: 'Japan', description: 'A city of traditional temples, cherry blossoms, and rich cultural heritage.', image: '', bestTime: 'March to May', climate: 'Temperate', photos: [], coordinates: { lat: 35.0116, lng: 135.7681 } },
  { name: 'Maldives', country: 'Maldives', description: 'A luxury island getaway with crystal clear waters and overwater bungalows.', image: '', bestTime: 'November to April', climate: 'Tropical', photos: [], coordinates: { lat: 3.2028, lng: 73.2207 } },
  { name: 'Rajasthan', country: 'India', description: 'Known for majestic forts, desert landscapes, and royal heritage.', image: '', bestTime: 'October to March', climate: 'Arid', photos: [], coordinates: { lat: 27.0238, lng: 74.2179 } },
  { name: 'Paris', country: 'France', description: 'The city of lights, known for the Eiffel Tower, art, and cuisine.', image: '', bestTime: 'April to June', climate: 'Temperate', photos: [], coordinates: { lat: 48.8566, lng: 2.3522 } },
  { name: 'Manali', country: 'India', description: 'A scenic hill station in the Himalayas, popular for adventure sports.', image: '', bestTime: 'March to June', climate: 'Alpine', photos: [], coordinates: { lat: 32.2432, lng: 77.1892 } },
  { name: 'Dubai', country: 'UAE', description: 'A modern desert metropolis known for luxury shopping and skyscrapers.', image: '', bestTime: 'November to March', climate: 'Desert', photos: [], coordinates: { lat: 25.2048, lng: 55.2708 } },
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected for seeding...');
    await Destination.deleteMany({});
    console.log('Cleared existing destinations');
    await Destination.insertMany(sampleDestinations);
    console.log(`Seeded ${sampleDestinations.length} destinations successfully ✅`);
    process.exit(0);
  } catch (err) {
    console.error('Seeding failed:', err.message);
    process.exit(1);
  }
};

seedDatabase();