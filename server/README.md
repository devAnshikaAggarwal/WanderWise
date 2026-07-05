# WanderWise — Backend

Express + MongoDB REST API for **WanderWise**.

📖 Full documentation and API reference: [main README](../README.md)

## Quick Start

    npm install
    cp .env.example .env

Fill in `MONGO_URI`, `JWT_SECRET`, `PORT` — then:

    npm run dev

Runs at **http://localhost:5000**

Seed data (one time):

    node seed.js
    node updateDestinations.js
    node seedEmergency.js

## Stack
Node.js · Express · Mongoose · JWT · bcrypt
