#!/bin/sh

echo "Seeding database..."
node seed.js

echo "Starting server..."
npm run start
