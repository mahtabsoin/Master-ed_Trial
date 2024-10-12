console.log('Step 1: Basic console log');

// Test if we can read environment variables
console.log('Step 2: NODE_ENV =', process.env.NODE_ENV);

// Test if we can read from .env file
require('dotenv').config();
console.log('Step 3: DATABASE_URL =', process.env.DATABASE_URL);

// Test if we can import the pg module
const { Client } = require('pg');
console.log('Step 4: Successfully imported pg module');

// Create a client instance
const client = new Client({
  connectionString: process.env.DATABASE_URL
});
console.log('Step 5: Created client instance');

// Attempt to connect
client.connect()
  .then(() => {
    console.log('Step 6: Successfully connected to the database');
    return client.query('SELECT NOW()');
  })
  .then(result => {
    console.log('Step 7: Executed query, current time is:', result.rows[0].now);
    return client.end();
  })
  .then(() => {
    console.log('Step 8: Closed database connection');
  })
  .catch(err => {
    console.error('Error:', err);
  })
  .finally(() => {
    console.log('Step 9: Script execution completed');
  });

console.log('Step 10: Reached end of script');